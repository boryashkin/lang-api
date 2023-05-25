package entity

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Rule string
type MediaType string
type RulePlacement map[Rule][2]int

type Media struct {
	Description string    `json:"description" bson:"description"`
	Type        MediaType `json:"type" bson:"type"`
	Uri         string    `json:"uri" bson:"uri"`
	Timing      []int     `json:"timing" bson:"timing"` // start stop points (do I need stop?)
}

type Text struct {
	ID             primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Text           string             `json:"text" bson:"text"`
	Rules          []Rule             `json:"rules" bson:"rules"` // ["present perfect", …], maybe replace with constants from the code
	RulePlacements []RulePlacement    `json:"rule_placement" bson:"rule_placement"`
	SourceID       primitive.ObjectID `json:"source_id" bson:"source_id"`
	Media          Media              `json:"media" bson:"media"`
	CreatedAt      time.Time          `json:"created_at" bson:"created_at"`
}

type TextRepository interface {
	Get(id primitive.ObjectID) (*Text, error)
	Create(t *Text) error
}
