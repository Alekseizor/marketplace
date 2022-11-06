package ds

import "github.com/satori/go.uuid"

type Product struct {
	UUID        uuid.UUID `gorm:"type:uuid;primary_key;"`
	Price       int
	Image       string
	Name        string
	Description string
}
