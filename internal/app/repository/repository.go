package repository

import (
	"errors"
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

func (r *Repository) GetItemById(uuid uuid.UUID) (ds.Product, string, error) {
	var product ds.Product
	result := r.db.First(&product, "uuid = ?", uuid)
	if result.Error != nil {
		return product, "no product found with this uuid", result.Error
	}
	return product, "", nil
}

func (r *Repository) GetProductPrice(uuid uuid.UUID) (int, error) {
	var product ds.Product
	err := r.db.First(&product, "uuid = ?", uuid).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 404, err
		}
		return 500, err
	}
	return product.Price, err
}

func (r *Repository) ChangePrice(uuid uuid.UUID, price int) (int, error) {
	var product ds.Product
	err := r.db.First(&product, "uuid = ?", uuid).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 404, err
		}
		return 500, err
	}
	err = r.db.Model(&product).Update("Price", price).Error
	//if errors.Is(err, gorm.ErrRecordNotFound)
	if err != nil {
		return 500, err
	}
	return 0, nil
}

func (r *Repository) DeleteProduct(uuid uuid.UUID) (string, error) {
	var product ds.Product
	result := r.db.First(&product, "uuid = ?", uuid)
	if result.Error != nil {
		return "no product found with this uuid", result.Error
	}
	result = r.db.Delete(&product, "uuid = ?", uuid)
	if result.Error != nil {
		return "", result.Error
	}
	return "ОК", nil
}

func (r *Repository) UpdateProduct(uuid uuid.UUID, product ds.Product) (int, error) {
	product.UUID = uuid
	err := r.db.Model(&product).Updates(ds.Product{Name: product.Name, Price: product.Price, Description: product.Description, Image: product.Image}).Error
	//if errors.Is(err, gorm.ErrRecordNotFound)
	if err != nil {
		return 500, err
	}
	return 0, nil
}

func (r *Repository) GetCart(userUUID uuid.UUID) ([]ds.Cart, error) {
	var cart []ds.Cart
	err := r.db.Where("user_uuid = ?", userUUID).Find(&cart).Error
	return cart, err
}

func (r *Repository) AddToCart(cart ds.Cart) error {
	err := r.db.Create(&cart).Error
	if err != nil {
		return err
	}
	return nil
}

func (r *Repository) DeleteCart(storeUUID uuid.UUID) (int, error) {
	var cart ds.Cart
	log.Println(storeUUID)
	err := r.db.First(&cart, "uuid = ?", storeUUID).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 404, err
		}
		return 500, err
	}

	err = r.db.Delete(&cart, "uuid = ?", storeUUID).Error
	if err != nil {
		return 500, err
	}
	return 0, nil
}

func (r *Repository) Register(user *ds.User) error {
	return r.db.Create(user).Error
}

func (r *Repository) GetUserByLogin(login string) (*ds.User, error) {
	user := &ds.User{}

	err := r.db.First(&user, "name = ?", login).Error
	if err != nil {
		return nil, err
	}

	return user, nil
}
