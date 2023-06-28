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

type LessonElementRepository struct {
	collection *mongo.Collection
}

func NewLessonElementRepository(elementCollection *mongo.Collection) *LessonElementRepository {
	elementCollection.Indexes().CreateMany(context.TODO(), []mongo.IndexModel{
		{
			Keys: bson.M{
				"lesson_id": 1,
				"slug":      1,
			},
			Options: options.Index().SetUnique(true),
		},
	},
	)

	return &LessonElementRepository{
		collection: elementCollection,
	}
}

func (s *LessonElementRepository) Get(ctx context.Context, id string) (*entity.LessonElement, error) {
	mongoID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errors.New("invalid id")
	}
	var text entity.LessonElement

	err = s.collection.FindOne(context.Background(), bson.M{
		"_id": mongoID,
	}).Decode(&text)

	return &text, err
}

func (s *LessonElementRepository) Create(ctx context.Context, t *entity.LessonElement) error {
	if !t.ID.IsZero() {
		return errors.New("cannot create text with id")
	}
	t.CreatedAt = time.Now()

	id := primitive.NewObjectID()
	result, err := s.collection.InsertOne(context.Background(), t)
	if err == nil {
		if oid, ok := result.InsertedID.(primitive.ObjectID); ok {
			id = oid
		} else {
			err = errors.New("failed to convert id")
		}
	}
	t.ID = id

	return err
}

func (s *LessonElementRepository) Find(ctx context.Context, f *entity.LessonElementFilter) (r []*entity.LessonElement, err error) {
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
