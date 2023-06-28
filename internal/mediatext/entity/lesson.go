package entity

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Lesson struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name        string             `json:"name" bson:"name"`
	Slug        string             `json:"slug" bson:"slug"` // unique
	Description string             `json:"description" bson:"description"`
	OwnerID     primitive.ObjectID `json:"owner_id" bson:"owner_id"`
	CreatedAt   time.Time          `json:"created_at" bson:"created_at"`
}

type LessonFilter struct {
	PaginationFilter
	IDs  []string
	Slug string
}

func (m *LessonFilter) MongoFilter() bson.M {
	f := bson.M{}
	if len(m.IDs) != 0 {
		ids := make([]primitive.ObjectID, len(m.IDs))
		for i, v := range m.IDs {
			id, err := primitive.ObjectIDFromHex(v)
			if err != nil {
				continue
			}
			ids[i] = id
		}
		f["_id"] = bson.M{"$in": ids}
	}
	if m.Slug != "" {
		f["slug"] = m.Slug
	}
	return f
}

type LessonRepository interface {
	Get(ctx context.Context, id string) (*Lesson, error)
	Create(ctx context.Context, l *Lesson) error
	Find(ctx context.Context, filter *LessonFilter) ([]*Lesson, error)
}
