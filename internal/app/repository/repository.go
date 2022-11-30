package repository

import (
	"github.com/satori/go.uuid"
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

func (r *Repository) GetItemById(uuid string) (ds.Product, string, error) {
	var product ds.Product
	result := r.db.First(&product, "uuid = ?", uuid)
	if result.Error != nil {
		return product, "no product found with this uuid", result.Error
	}
	return product, "", nil
}

func (r *Repository) DeleteProduct(uuid string) (string, error) {
	var product ds.Product
	result := r.db.First(&product, "uuid = ?", uuid)
	if result.Error != nil {
		return "no product found with this uuid", result.Error
	}
	result = r.db.Delete(&product, "uuid = ?", uuid)
	if result.Error != nil {
		return "", result.Error
	}
	return uuid, nil
}

func (r *Repository) UpdateProduct(uuid uuid.UUID, price int) (error, string) {
	var product ds.Product
	err := r.db.First(&product, "uuid = ?", uuid).Error
	if err != nil {
		return err, "record not found"
	}
	err = r.db.Model(&product).Update("price", price).Error
	if err != nil {
		return err, "record not update"
	}
	return nil, ""
}

func (r *Repository) GetCart() ([]ds.Cart, error) {
	var cart []ds.Cart
	err := r.db.Find(&cart).Error
	return cart, err
}

func (r *Repository) AddToCart(cart ds.Cart) error {
	err := r.db.Create(&cart).Error
	if err != nil {
		return err
	}
	return nil
}

func (r *Repository) DeleteFromCart(product string) error {
	var cart ds.Cart
	err := r.db.Where("uuid = ?", product).Delete(&cart).Error
	if err != nil {
		return err
	}
	return nil
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
