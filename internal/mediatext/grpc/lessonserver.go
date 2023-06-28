package grpc

import (
	context "context"
	"fmt"
	"time"

	"github.com/boryashkin/language-api/internal/mediatext/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type MyLessonServiceServer struct {
	UnimplementedLessonServiceServer
	lessonRepository  entity.LessonRepository
	elementRepository entity.LessonElementRepository
	mediaRepository   entity.MediaRepository
	mediaPrefixCdn    string
}

func NewMyLessonServiceServer(
	lessonRepository entity.LessonRepository,
	elementRepository entity.LessonElementRepository,
	mediaRepository entity.MediaRepository,
	mediaPrefixCdn string,
) *MyLessonServiceServer {
	return &MyLessonServiceServer{
		lessonRepository:  lessonRepository,
		elementRepository: elementRepository,
		mediaRepository:   mediaRepository,
		mediaPrefixCdn:    mediaPrefixCdn,
	}
}

func (s *MyLessonServiceServer) CreateLesson(ctx context.Context, req *CreateLessonRequest) (*CreateLessonReply, error) {
	fmt.Println("ls CreateLesson")

	ownerID, err := primitive.ObjectIDFromHex(req.OwnerId)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid owner_id")
	}

	l := &entity.Lesson{
		Name:        req.Name,
		Slug:        req.Slug,
		OwnerID:     ownerID,
		CreatedAt:   time.Now(),
		Description: req.Description,
	}
	err = s.lessonRepository.Create(context.TODO(), l)
	if err != nil {
		// todo return specific err for non-unique slug
		return nil, status.Error(codes.AlreadyExists, "invalid slug")
		//return nil, status.Error(codes.InternalErr, "invalid slug")
	}

	return &CreateLessonReply{
		Id:          l.ID.Hex(),
		Name:        l.Name,
		Slug:        l.Slug,
		OwnerId:     l.OwnerID.Hex(),
		CreatedAt:   timestamppb.New(l.CreatedAt),
		Description: l.Description,
	}, nil
}

func (s *MyLessonServiceServer) StoreElement(ctx context.Context, req *StoreLessonElementRequest) (*StoreLessonElementReply, error) {
	fmt.Println("ls StoreElement")

	lesson, err := s.lessonRepository.Get(ctx, req.LessonId)
	if err != nil {
		return nil, status.Error(codes.NotFound, "lesson not found")
	}
	media, err := s.mediaRepository.Get(ctx, req.MediaId)
	if err != nil {
		return nil, status.Error(codes.NotFound, "media not found")
	}

	el := &entity.LessonElement{
		LessonID: lesson.ID,
		Name:     req.Name,
		Slug:     req.Slug,
		Order:    req.Order,
		MediaID:  media.ID,
	}

	el.Rules = make([]entity.Rule, len(req.Rules))

	for i, v := range req.Rules {
		el.Rules[i] = entity.Rule{
			Start: v.Start,
			Stop:  v.Stop,
			Name:  v.Name,
			Note:  v.Note,
			Color: v.Color,
		}
	}

	err = s.elementRepository.Create(ctx, el)
	if err != nil {
		return nil, status.Error(codes.Internal, "unable to create an element")
	}

	resp := &StoreLessonElementReply{
		Id: el.ID.Hex(),
	}

	return resp, nil
}

func (s *MyLessonServiceServer) FindElements(ctx context.Context, req *FindLessonElementRequest) (*FindElementsReply, error) {
	fmt.Println("ls FindElements", req.Pagination)

	f := &entity.LessonElementFilter{LessonID: req.LessonId}
	if req.Pagination != nil {
		f.Limit = req.Pagination.Limit
		f.Offset = req.Pagination.Offset
	}
	els, err := s.elementRepository.Find(ctx, f)
	if err != nil {
		return nil, status.Error(codes.NotFound, "elements not found")
	}

	mediaIDs := []string{}
	for _, v := range els {
		mediaIDs = append(mediaIDs, v.MediaID.Hex())
	}

	medias, err := s.mediaRepository.Find(ctx, &entity.MediaFilter{IDs: mediaIDs})
	if err != nil {
		return nil, status.Error(codes.Internal, "unable to get media")
	}
	fmt.Println("found media", mediaIDs, len(medias))
	mediaMap := make(map[string]*Media)
	for _, v := range medias {
		mediaMap[v.ID.Hex()] = &Media{
			Id:           v.ID.Hex(),
			SourceId:     v.SourceID.Hex(),
			Sequence:     int32(v.Sequence),
			OriginalLang: v.OriginalLang,
			Text:         v.Text,
			Type:         string(v.Type),
			Uri:          s.prefUri(v.Uri),
			UriThumbnail: s.prefUri(v.UriThumbnail),
			CreatedAt:    timestamppb.New(v.CreatedAt),
		}
	}

	response := &FindElementsReply{}
	response.Items = make([]*LessonElement, len(els))
	for i, v := range els {
		response.Items[i] = &LessonElement{
			Id:       v.ID.Hex(),
			LessonId: v.LessonID.Hex(),
			Name:     v.Name,
			Slug:     v.Slug,
			MediaId:  v.MediaID.Hex(),
		}
		response.Items[i].Rules = make([]*ElementRule, len(v.Rules))
		for ri, rv := range v.Rules {
			response.Items[i].Rules[ri] = &ElementRule{
				Start: rv.Start,
				Stop:  rv.Stop,
				Name:  rv.Name,
				Note:  rv.Note,
				Color: rv.Color,
			}
		}

		response.Items[i].Media = mediaMap[v.MediaID.Hex()]
	}

	return response, nil
}

func (s *MyLessonServiceServer) FindLessons(ctx context.Context, req *FindLessonsRequest) (*FindLessonsReply, error) {
	fmt.Println("ls FindElements")
	f := &entity.LessonFilter{Slug: req.Slug}
	if req.Pagination != nil {
		f.Limit = req.Pagination.Limit
		f.Offset = req.Pagination.Offset
	}
	if req.Id != "" {
		f.IDs = []string{req.Id}
	}
	lessons, err := s.lessonRepository.Find(ctx, f)
	if err != nil {
		return nil, status.Error(codes.Internal, "unable to find lessons")
	}

	response := &FindLessonsReply{}
	response.Items = make([]*Lesson, len(lessons))

	for i, v := range lessons {
		response.Items[i] = &Lesson{
			Id:          v.ID.Hex(),
			Slug:        v.Slug,
			Name:        v.Name,
			OwnerId:     v.OwnerID.Hex(),
			CreatedAt:   timestamppb.New(v.CreatedAt),
			Description: v.Description,
		}
	}

	return response, nil
}

// todo move from controller
func (s *MyLessonServiceServer) prefUri(uri string) string {
	if uri != "" {
		return s.mediaPrefixCdn + uri
	}

	return ""
}
