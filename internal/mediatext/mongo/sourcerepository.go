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

type TextSourceRepository struct {
	collection *mongo.Collection
}

func NewTextSourceRepository(textSourceCollection *mongo.Collection) TextSourceRepository {
	return TextSourceRepository{
		collection: textSourceCollection,
	}
}

func (s *TextSourceRepository) Get(id primitive.ObjectID) (*entity.TextSource, error) {
	var text entity.TextSource
	err := s.collection.FindOne(context.Background(), bson.M{
		"_id": id,
	}).Decode(&text)

	return &text, err
}

func (s *TextSourceRepository) Create(t *entity.TextSource) error {
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
