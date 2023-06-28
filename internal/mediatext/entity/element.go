package entity

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Rule struct {
	Start int32  `json:"start" bson:"start"`
	Stop  int32  `json:"stop" bson:"stop"`
	Name  string `json:"name" bson:"name"`
	Note  string `json:"note" bson:"note"`
	Color string `json:"color" bson:"color"`
}

type LessonElement struct {
	ID       primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	LessonID primitive.ObjectID `json:"lesson_id" bson:"lesson_id"`
	Name     string             `json:"name" bson:"name"`
	Slug     string             `json:"slug" bson:"slug"`
	Order    int32              `json:"order" bson:"order"`
	// todo for search/indexing purposes write rules also as {"phrase": "part of text", "rule_name": "Past Simple"}
	Rules     []Rule             `json:"rules" bson:"rules"`
	MediaID   primitive.ObjectID `json:"media_id" bson:"media_id"`
	CreatedAt time.Time          `json:"created_at" bson:"created_at"`
}

type LessonElementFilter struct {
	PaginationFilter
	LessonID string
}

func (m *LessonElementFilter) MongoFilter() bson.M {
	f := bson.M{}
	id, err := primitive.ObjectIDFromHex(m.LessonID)
	if err != nil {
		// id is required by now
		id = primitive.NewObjectID()
	}
	f["lesson_id"] = id

	return f
}

type LessonElementRepository interface {
	Get(ctx context.Context, id string) (*LessonElement, error)
	Create(ctx context.Context, t *LessonElement) error
	Find(ctx context.Context, filter *LessonElementFilter) ([]*LessonElement, error)
}
