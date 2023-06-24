package entity

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Lesson struct {
	ID        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name      string             `json:"name" bson:"name"`
	Slug      string             `json:"slug" bson:"slug"` // unique
	OwnerID   primitive.ObjectID `json:"owner_id" bson:"owner_id"`
	CreatedAt time.Time          `json:"created_at" bson:"created_at"`
}

type LessonRepository interface {
	Get(ctx context.Context, id string) (*Lesson, error)
	Create(ctx context.Context, l *Lesson) error
}
