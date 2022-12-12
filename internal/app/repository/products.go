package repository

import (
	"marketplace/internal/app/ds"
)

func (r *Repository) GetProductName(uuid string) (string, error) {
	var product ds.Product
	err := r.db.Select("name").First(&product, "uuid = ?", uuid).Error
	return product.Name, err
}
