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
	lessonRepository entity.LessonRepository
}

func NewMyLessonServiceServer(lessonRepository entity.LessonRepository) *MyLessonServiceServer {
	return &MyLessonServiceServer{
		lessonRepository: lessonRepository,
	}
}

func (s *MyLessonServiceServer) CreateLesson(ctx context.Context, req *CreateLessonRequest) (*CreateLessonReply, error) {
	fmt.Println("ls CreateLesson")

	ownerID, err := primitive.ObjectIDFromHex(req.OwnerId)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid owner_id")
	}

	l := &entity.Lesson{
		Name:      req.Name,
		Slug:      req.Slug,
		OwnerID:   ownerID,
		CreatedAt: time.Now(),
	}
	err = s.lessonRepository.Create(context.TODO(), l)
	if err != nil {
		// todo return specific err for non-unique slug
		return nil, status.Error(codes.AlreadyExists, "invalid slug")
		//return nil, status.Error(codes.InternalErr, "invalid slug")
	}

	return &CreateLessonReply{
		Id:        l.ID.Hex(),
		Name:      l.Name,
		Slug:      l.Slug,
		OwnerId:   l.OwnerID.Hex(),
		CreatedAt: timestamppb.New(l.CreatedAt),
	}, nil
}
