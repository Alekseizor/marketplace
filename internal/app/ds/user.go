package ds

import (
	"github.com/google/uuid"
	"marketplace/internal/app/role"
)

type User struct {
	UUID uuid.UUID `db:"uuid" gorm:"type:uuid;primary_key"`
	Name string    `db:"name"`
	Role role.Role `db:"role" sql:"type:string;"`
	Pass string    `db:"pass"`
}
