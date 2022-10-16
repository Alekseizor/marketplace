package repository

import (
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"marketplace/internal/app/ds"
)

type Repository struct {
	db *gorm.DB
}

func New(dsn string) (*Repository, error) {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return &Repository{
		db: db,
	}, nil
}

func (r *Repository) GetProductByID(id int) (*ds.Product, error) {
	log.Println("я тут")
	product := &ds.Product{}
	err := r.db.First(product, id).Error // find product with code D42
	if err != nil {
		return nil, err
	}

	return product, nil
}

func (r *Repository) CreateProduct(product ds.Product) error {
	return r.db.Create(product).Error
}

func (r *Repository) GetProducts() ([]ds.Product, error) {

	var products []ds.Product
	result := r.db.Find(&products)
	if result.Error != nil {
		return products, result.Error
	}
	return products, nil

}

func (r *Repository) GetItemById(uuid string) (string, string, int, error) {
	var product ds.Product
	result := r.db.First(&product, "uuid = ?", uuid)
	if result.Error != nil {
		return "", "", 0, result.Error
	}
	return product.Name, product.Description, product.Price, nil
}

func (r *Repository) DeleteProduct(uuid string) error {
	var product ds.Product
	result := r.db.Delete(&product, "uuid = ?", uuid)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *Repository) UpdateProduct(uuid uuid.UUID, price int) error {
	var product ds.Product
	product.UUID = uuid
	result := r.db.Model(&product).Update("price", price)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
