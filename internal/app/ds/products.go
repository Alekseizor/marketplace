package ds

import "github.com/google/uuid"

type Product struct {
	UUID        uuid.UUID `db:"uuid" gorm:"type:uuid;primary_key;"`
	Price       int       `db:"price"`
	Image       string    `db:"image"`
	Name        string    `db:"name"`
	Description string    `db:"description"`
}
