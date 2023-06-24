package mongo

import (
	"context"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/boryashkin/language-api/internal/mediatext/entity"
)

type MediaRepository struct {
	collection *mongo.Collection
}

func NewMediaRepository(textCollection *mongo.Collection) *MediaRepository {
	return &MediaRepository{
		collection: textCollection,
	}
}

func (s *MediaRepository) Get(ctx context.Context, id string) (*entity.Media, error) {
	mongoID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errors.New("invalid id")
	}

	var m entity.Media
	err = s.collection.FindOne(context.Background(), bson.M{
		"_id": mongoID,
	}).Decode(&m)

	return &m, err
}

func (s *MediaRepository) Find(ctx context.Context, f *entity.MediaFilter) (r []*entity.Media, err error) {
	cur, err := s.collection.Find(context.Background(), f.MongoFilter())
	if err != nil {
		return nil, err
	}
	err = cur.All(ctx, &r)

	return r, err
}

func (s *MediaRepository) Create(ctx context.Context, m *entity.Media) error {
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
