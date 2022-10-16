package ds

import "github.com/google/uuid"

type Product struct {
	UUID        uuid.UUID `gorm:"type:uuid;primary_key;"`
	Price       int
	Name        string
	Description string
}
