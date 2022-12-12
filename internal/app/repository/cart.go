package repository

import (
	"github.com/google/uuid"
	"marketplace/internal/app/ds"
)

func (r *Repository) DeleteByUser(userUUID uuid.UUID) error {
	var cart ds.Cart
	err := r.db.Where("user_uuid = ?", userUUID).Delete(&cart).Error
	if err != nil {
		return err
	}
	return nil
}
