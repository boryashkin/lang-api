package entity

import "go.mongodb.org/mongo-driver/mongo/options"

type PaginationFilter struct {
	Limit  int64
	Offset int64
}

func (f *PaginationFilter) MongoPagination() *options.FindOptions {
	if f.Limit < 1 || f.Limit > 100 {
		f.Limit = 30
	}
	if f.Offset < 0 {
		f.Offset = 0
	}

	return &options.FindOptions{Skip: &f.Offset, Limit: &f.Limit}
}
