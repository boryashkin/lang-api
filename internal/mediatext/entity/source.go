package entity

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TextSource struct {
	ID           primitive.ObjectID `json:"id" bson:"_id,omitempty"`            // tbbt_id
	Description  string             `json:"description" bson:"description"`     // "TV show"
	Owner        string             `json:"owner" bson:"owner"`                 // "https://www.warnerbros.com/tv/big-bang-theory"
	OriginalLang string             `json:"original_lang" bson:"original_lang"` // en
	CreatedAt    time.Time          `json:"created_at" bson:"created_at"`
}

type TextSourceRepository interface {
	// todo remove "primitive" package if it's independable interface
	Get(id primitive.ObjectID) (*TextSource, error)
	Create(ts *TextSource) error
}

/*
{
	"description": "A cartoon about adventures",
	"owner": "https://www.dreamworks.com/movies/shrek",
	"original_lang": "en",
	"created_at": ISODate("2023-06-18T13:11:18.965Z")
}
*/
