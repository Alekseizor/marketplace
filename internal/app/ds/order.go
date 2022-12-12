package ds

import (
	"github.com/google/uuid"
	"github.com/lib/pq"
	"time"
)

type Order struct {
	UUID     uuid.UUID      `db:"uuid" gorm:"type:uuid;primary_key"`
	Products pq.StringArray `db:"products" gorm:"type:text[]"`
	UserUUID uuid.UUID      `db:"user_uuid"`
	Date     time.Time      `db:"date" gorm:"type:timestamp"`
	Status   string         `db:"status"`
}
