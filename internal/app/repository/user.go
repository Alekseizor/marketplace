package repository

import (
	"github.com/google/uuid"
	"marketplace/internal/app/ds"
)

func (r *Repository) GetUserByUUID(uuid uuid.UUID) (string, error) {
	user := &ds.User{}
	err := r.db.First(&user, "uuid = ?", uuid).Error
	if err != nil {
		return "", err
	}
	return user.Name, nil
}
