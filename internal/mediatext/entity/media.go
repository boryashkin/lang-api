package entity

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MediaType string

func IsMediaType(t string) bool {
	switch t {
	case "video":
		return true
	case "text":
		return true
	}

	return false
}

type Media struct {
	ID           primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	SourceID     primitive.ObjectID `json:"source_id" bson:"source_id"`
	Sequence     int                `json:"sequence" bson:"sequence"`           // to connect to other videos in a series
	OriginalLang string             `json:"original_lang" bson:"original_lang"` // en
	Text         string             `json:"text" bson:"text"`
	Type         MediaType          `json:"type" bson:"type"`
	Uri          string             `json:"uri" bson:"uri"`
	UriThumbnail string             `json:"uri_thumbnail" bson:"uri_thumbnail"`
	CreatedAt    time.Time          `json:"created_at" bson:"created_at"`
	//Timing    []int              `json:"timing" bson:"timing"` // start stop points (do I need stop?)
}

type MediaFilter struct {
	PaginationFilter
	IDs  []string
	Text string
	Type string
}

func (m *MediaFilter) MongoFilter() bson.M {
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
	if m.Text != "" {
		f["text"] = bson.M{"$regex": m.Text, "$options": "im"}
	}
	if m.Type != "" {
		f["type"] = m.Type
	}

	return f
}

type MediaRepository interface {
	Get(ctx context.Context, id string) (*Media, error)
	Find(ctx context.Context, filter *MediaFilter) ([]*Media, error)
	Create(ctx context.Context, m *Media) error
}
