package entity

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Rule string
type MediaType string
type RulePlacement map[Rule][2]int

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

type Text struct {
	ID             primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Rules          []Rule             `json:"rules" bson:"rules"`                   // ["present perfect", …], maybe replace with constants from the code
	RulePlacements []RulePlacement    `json:"rule_placement" bson:"rule_placement"` // on media.text
	//Media          Media              `json:"media" bson:"media"` // join for now
	MediaID   primitive.ObjectID `json:"media_id" bson:"media_id"`
	CreatedAt time.Time          `json:"created_at" bson:"created_at"`
}

type MediaFilter struct {
	ID   string
	Text string
}

func (m *MediaFilter) MongoFilter() bson.M {
	f := bson.M{}
	if m.ID != "" {
		id, _ := primitive.ObjectIDFromHex(m.ID)
		f["_id"] = id
	}
	if m.Text != "" {
		f["text"] = bson.M{"$regex": m.Text, "$options": "im"}
	}
	return f
}

type MediaRepository interface {
	Get(ctx context.Context, id string) (*Media, error)
	Find(ctx context.Context, filter *MediaFilter) ([]*Media, error)
	Create(ctx context.Context, m *Media) error
}
type TextRepository interface {
	Get(id string) (*Text, error)
	Create(t *Text) error
}
