package main

import (
	"bufio"
	"crypto/rand"
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"

	astisub "github.com/asticode/go-astisub"
	"github.com/boryashkin/language-api/internal/mediatext/entity"
	ffmpeg "github.com/u2takey/ffmpeg-go"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const ExtMp4 = "mp4"
const ExtJpeg = "jpeg"

// go run cmd/videohandler/main.go somefldr/orig.mp4 somefldr/subs.vtt somefld/outfldr # parse all
// go run cmd/videohandler/main.go somefldr/orig.mp4 somefldr/subs.vtt somefld/outfldr 462 463 # parse 462
// go run cmd/videohandler/main.go somefldr/orig.mp4 somefldr/subs.vtt somefld/outfldr 462 463 -0.9 0.5 # parse 462 and add 0.9s to the left and 0.5 to the right
func main() {
	args := os.Args[1:]
	if len(args) < 3 {
		panic("2 args required: full path to video and subtitles, path for output; optional - a serial number of a line")
	}
	videofile := args[0]
	subsfile := args[1]
	outpath := args[2]

	if strings.HasSuffix(outpath, "/") {
		panic("output path must not end with /")
	}
	fromEpisode := 0
	toEpisode := 0
	var err error
	if len(args) > 3 {
		fromEpisode, err = strconv.Atoi(args[3])
		if err != nil || fromEpisode < 0 {
			panic("episode num must be a positive numeric")
		}
	}
	if len(args) > 4 {
		toEpisode, err = strconv.Atoi(args[4])
		if err != nil || toEpisode < 0 {
			panic("episode num must be a positive numeric")
		}
	}
	leftBorder := float64(0)
	rightBorder := float64(0)
	if fromEpisode > 0 && toEpisode > 0 {
		if len(args) > 5 {
			leftBorder, err = strconv.ParseFloat(args[5], 64)
			if err != nil {
				panic("border must be a float")
			}
		}
		if len(args) > 6 {
			rightBorder, err = strconv.ParseFloat(args[6], 64)
			if err != nil {
				panic("border must be a float")
			}
		}
	}

	subs, err := astisub.OpenFile(subsfile)
	if err != nil {
		panic("falied to open subs")
	}
	subs.RemoveStyling()
	if fromEpisode > len(subs.Items) {
		panic("episode num must not be bigger than number of lines")
	} else if fromEpisode > 0 {
		fromEpisode--
	}
	if toEpisode > len(subs.Items) || toEpisode == 0 {
		toEpisode = len(subs.Items)
	}

	i := fromEpisode
	b := make([]byte, 4)
	_, err = rand.Read(b)
	if err != nil {
		fmt.Println("Error: ", err)
		return
	}

	items := subs.Items[fromEpisode:toEpisode]

	wg := sync.WaitGroup{}
	wg.Add(len(items))

	saver = NewSaver()
	workers := 3
	sourceID, err := primitive.ObjectIDFromHex("648ef1e65a4ab6473e5b28e5")
	if err != nil {
		fmt.Println("Error: ", err)
		return
	}
	tasks := make(chan *CutMetaData)
	for wi := 0; wi < workers; wi++ {
		go cutVideosWorker(tasks, &wg)
	}

	randomPrefix := fmt.Sprintf("%x", b[0:4])
	for _, line := range items {
		i++
		_, err := rand.Read(b)
		if err != nil {
			fmt.Println("Error: ", err)
			return
		}
		randomString := fmt.Sprintf("%s-%x", randomPrefix, b[0:2])

		startAtCorrected := line.StartAt.Seconds() + leftBorder
		stopAtCorrected := line.EndAt.Seconds() + rightBorder
		startPoint := strconv.FormatFloat(startAtCorrected, 'f', 3, 64)
		stopPoint := strconv.FormatFloat(stopAtCorrected, 'f', 3, 64)
		meta := CutMetaData{
			SourceID:   sourceID,
			Videofile:  videofile,
			Outpath:    outpath,
			Index:      i,
			Suffix:     randomString,
			Line:       line,
			StartPoint: startPoint,
			StopPoint:  stopPoint,
		}

		tasks <- &meta

		fmt.Println("line", line.String(), line.StartAt, line.EndAt, "len", line.EndAt-line.StartAt)
	}
	close(tasks)
	wg.Wait()

	tmpJson, err := os.Create("/tmp/dat2-" + randomPrefix)
	if err != nil {
		panic("failed to create tmp file")
	}
	defer tmpJson.Close()
	err = saver.SaveJson(tmpJson)
	if err != nil {
		fmt.Println("err while saving json " + err.Error())
	}

	fmt.Println("duration", subs.Duration(), "seg_count", i)
}

type CutMetaData struct {
	Videofile  string
	Outpath    string
	SourceID   primitive.ObjectID
	Index      int
	Suffix     string
	Line       *astisub.Item
	StartPoint string
	StopPoint  string
}

func (c *CutMetaData) GetFileName(extension string) string {
	return fmt.Sprintf("%s/output%d-%s.%s", c.Outpath, c.Index, c.Suffix, extension)
}

func cutVideosWorker(tasks <-chan *CutMetaData, wg *sync.WaitGroup) {
	for task := range tasks {
		task := task
		cutVideo(task)
		cutThumbnail(task)
		saver.Add(task)
		wg.Done()
	}
}

var saver *Saver

type Saver struct {
	mu    sync.Mutex
	Items map[int]*entity.Media
}

func NewSaver() *Saver {
	return &Saver{
		Items: make(map[int]*entity.Media),
	}
}

func (s *Saver) Add(meta *CutMetaData) error {
	s.mu.Lock()
	s.Items[meta.Index] = &entity.Media{
		SourceID:     meta.SourceID,
		Sequence:     meta.Index,
		OriginalLang: "en",
		Text:         meta.Line.String(),
		Type:         "video",
		Uri:          meta.GetFileName(ExtMp4),
		UriThumbnail: meta.GetFileName(ExtJpeg),
		CreatedAt:    time.Now(),
	}
	s.mu.Unlock()

	return nil
}
func (s *Saver) SaveJson(f *os.File) error {
	w := bufio.NewWriter(f)
	_, err := w.WriteString("[\n")
	if err != nil {
		return errors.Join(err, errors.New("err 1"))
	}
	added := 0
	for i := 1; i <= len(s.Items); i++ {
		if added != 0 {
			_, err := w.WriteString(",\n")
			if err != nil {
				return errors.Join(err, errors.New("err 2"))
			}
		}
		added++

		//m, err := json.Marshal(s.Items[i])
		m, err := bson.MarshalExtJSON(s.Items[i], true, true)
		if err != nil {
			return errors.Join(err, errors.New("err 3"))
		}
		_, err = w.Write(m)
		if err != nil {
			return errors.Join(err, errors.New("err 4"))
		}
		if err != nil {
			return errors.Join(err, errors.New("err 5"))
		}
	}
	w.WriteString("\n]\n")
	if err != nil {
		return errors.Join(err, errors.New("err 6"))
	}
	err = w.Flush()
	if err != nil {
		return errors.Join(err, errors.New("err 7"))

	}

	return nil
}

func cutVideo(meta *CutMetaData) error {
	return ffmpeg.Input(
		meta.Videofile,
		ffmpeg.KwArgs{
			"ss": meta.StartPoint,
			"to": meta.StopPoint,
		},
	).
		Output(
			meta.GetFileName(ExtMp4),
			ffmpeg.KwArgs{
				//"c":              "copy", // gives black frames, do not use
				"map":              "0",
				"reset_timestamps": 1,
				"sn":               "", // discard subtitles
				"vf":               "drawtext=text='langapi.borisd.ru':fontcolor=gray:fontsize=6:x=(w-text_w*2):y=(h-text_h*2)",
			},
		).
		Run()
}
func cutThumbnail(meta *CutMetaData) error {
	return ffmpeg.Input(
		meta.Videofile,
		ffmpeg.KwArgs{
			"ss": meta.StartPoint,
			"to": meta.StopPoint,
		},
	).
		Output(
			meta.GetFileName(ExtJpeg),
			ffmpeg.KwArgs{
				"frames:v": "1",
			},
		).
		Run()
}
