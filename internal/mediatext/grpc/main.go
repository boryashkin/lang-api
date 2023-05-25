package grpc

import (
	context "context"
	"time"

	"google.golang.org/protobuf/types/known/timestamppb"
)

type MyMediaTextServiceServer struct {
	UnimplementedMediaTextServiceServer
}

func (s *MyMediaTextServiceServer) Find(ctx context.Context, req *FindMediaTextRequest) (*FindMediaTextReply, error) {
	reply := FindMediaTextReply{}
	reply.Texts = make([]*MediaText, 1)
	txt1 := MediaText{
		Id:   "fafafafafafafafafafaf",
		Text: "- you know what",
		RulePlacements: map[string]*TextPlacement{
			"present perfect": {
				Placement: []int64{
					2, 9,
				},
			},
		},
		SourceId: "fafafafafafafafafafaf",
		Media: &Media{
			Description: "season 2, episode 2",
			Type:        "tv show",
			Uri:         "/himym/s2/e2/afaf",
			Timing: []int64{
				240, 255,
			},
		},
		CreatedAt: timestamppb.New(time.Now()),
	}
	reply.Texts[0] = &txt1

	return &reply, nil
}
