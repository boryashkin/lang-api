package mongo

import (
	"context"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/boryashkin/language-api/internal/mediatext/entity"
)

type LessonRepository struct {
	collection *mongo.Collection
}

func NewLessonRepository(lessonCollection *mongo.Collection) *LessonRepository {
	lessonCollection.Indexes().CreateMany(context.TODO(), []mongo.IndexModel{
		{
			Keys: bson.M{
				"slug": 1,
			},
			Options: options.Index().SetUnique(true),
		},
	},
	)

	return &LessonRepository{
		collection: lessonCollection,
	}
}

func (s *LessonRepository) Get(ctx context.Context, id string) (*entity.Lesson, error) {
	mongoID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errors.New("invalid id")
	}

	var m entity.Lesson
	err = s.collection.FindOne(context.Background(), bson.M{
		"_id": mongoID,
	}).Decode(&m)

	return &m, err
}

func (s *LessonRepository) Create(ctx context.Context, m *entity.Lesson) error {
	if !m.ID.IsZero() {
		return errors.New("cannot create text with id")
	}
	m.CreatedAt = time.Now()

	id := primitive.NewObjectID()
	result, err := s.collection.InsertOne(context.Background(), m)
	if err == nil {
		if oid, ok := result.InsertedID.(primitive.ObjectID); ok {
			id = oid
		} else {
			err = errors.New("failed to convert id")
		}
	}
	m.ID = id

	return err
}

func (s *LessonRepository) Find(ctx context.Context, f *entity.LessonFilter) (r []*entity.Lesson, err error) {
	opts := []*options.FindOptions{}
	page := f.MongoPagination()
	if page != nil {
		opts = append(opts, f.MongoPagination())
	}
	cur, err := s.collection.Find(context.Background(), f.MongoFilter(), opts...)
	if err != nil {
		return nil, err
	}
	err = cur.All(ctx, &r)

	return r, err
}
