package grpc

import (
	context "context"
	"errors"
	"fmt"

	"github.com/boryashkin/language-api/internal/mediatext/entity"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type MyMediaServiceServer struct {
	UnimplementedMediaServiceServer
	mediaRepository entity.MediaRepository
}

func NewMyMediaServiceServer(mediaRepository entity.MediaRepository) *MyMediaServiceServer {
	return &MyMediaServiceServer{
		mediaRepository: mediaRepository,
	}
}

func (s *MyMediaServiceServer) FindMedia(ctx context.Context, req *FindMediaRequest) (*FindMediaReply, error) {
	fmt.Println("ms FindMedia")
	reply := FindMediaReply{}

	reply.Media = make([]*Media, 0)
	filter := entity.MediaFilter{
		ID:   req.Id,
		Text: req.Text,
	}
	res, err := s.mediaRepository.Find(ctx, &filter)
	if err != nil {
		fmt.Println("media repo err", err)
		return nil, errors.New("not found")
	}
	for _, m := range res {
		m1 := Media{
			Id:           m.ID.Hex(),
			SourceId:     m.SourceID.Hex(),
			Sequence:     int32(m.Sequence),
			OriginalLang: m.OriginalLang,
			Text:         m.Text,
			Type:         string(m.Type),
			Uri:          m.Uri,
			UriThumbnail: m.UriThumbnail,
			CreatedAt:    timestamppb.New(m.CreatedAt),
		}
		reply.Media = append(reply.Media, &m1)
	}

	return &reply, nil
}
