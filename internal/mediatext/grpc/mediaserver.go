package grpc

import (
	context "context"
	"errors"
	"fmt"

	"github.com/boryashkin/language-api/internal/mediatext/entity"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type MyMediaServiceServer struct {
	UnimplementedMediaServiceServer
	mediaRepository entity.MediaRepository
	mediaPrefixCdn  string
}

func NewMyMediaServiceServer(mediaRepository entity.MediaRepository, mediaPrefixCdn string) *MyMediaServiceServer {
	return &MyMediaServiceServer{
		mediaRepository: mediaRepository,
		mediaPrefixCdn:  mediaPrefixCdn,
	}
}

func (s *MyMediaServiceServer) FindMedia(ctx context.Context, req *FindMediaRequest) (*FindMediaReply, error) {
	fmt.Println("ms FindMedia")
	reply := FindMediaReply{}

	reply.Media = make([]*Media, 0)
	filter := entity.MediaFilter{
		Text: req.Text,
	}
	if req.Pagination != nil {
		filter.Limit = req.Pagination.Limit
		filter.Offset = req.Pagination.Offset
	}
	if req.Id != "" {
		filter.IDs = []string{req.Id}
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
			Uri:          s.prefUri(m.Uri),
			UriThumbnail: s.prefUri(m.UriThumbnail),
			CreatedAt:    timestamppb.New(m.CreatedAt),
		}
		reply.Media = append(reply.Media, &m1)
	}

	return &reply, nil
}

func (s *MyMediaServiceServer) CreateMedia(ctx context.Context, req *CreateMediaRequest) (*CreateMediaReply, error) {
	fmt.Println("ms CreateMedia")

	if !entity.IsMediaType(req.Type) {
		return nil, status.Error(codes.InvalidArgument, "invalid type")
	}
	if len(req.Text) == 0 {
		return nil, status.Error(codes.InvalidArgument, "invalid text")
	}
	m := &entity.Media{Text: req.Text, Type: entity.MediaType(req.Type)}
	err := s.mediaRepository.Create(ctx, m)
	if err != nil {
		return nil, status.Error(codes.Internal, "unable to create media")
	}

	return &CreateMediaReply{
		Result: &Media{
			Id:           m.ID.Hex(),
			Text:         m.Text,
			Type:         string(m.Type),
			OriginalLang: m.OriginalLang,
		},
	}, nil
}

// todo move from controller
func (s *MyMediaServiceServer) prefUri(uri string) string {
	if uri != "" {
		return s.mediaPrefixCdn + uri
	}
	fmt.Println("EMPTY !")

	return ""
}
