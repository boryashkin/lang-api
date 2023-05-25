package entity

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TextSource struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`        // tbbt_id
	Description string             `json:"description" bson:"description"` // "TV show"
	Owner       string             `json:"owner" bson:"owner"`             // "https://www.warnerbros.com/tv/big-bang-theory"
	CreatedAt   time.Time          `json:"created_at" bson:"created_at"`
}

type TextSourceRepository interface {
	Get(id primitive.ObjectID) (*TextSource, error)
	Create(ts *TextSource) error
}
