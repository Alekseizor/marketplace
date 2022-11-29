package ds

import "github.com/satori/go.uuid"

type Cart struct {
	UUID    uuid.UUID `db:"uuid" gorm:"type:uuid;primary_key;"`
	Product string    `db:"product"`
}
