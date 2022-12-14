package repository

import (
	"errors"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"log"
	"marketplace/internal/app/ds"
	"net/url"
	"time"
)

func (r *Repository) AddOrder(order ds.Order) error {
	var names []string
	log.Println(order.Products)
	for _, val := range order.Products {
		name, err := r.GetProductName(val)
		if err != nil {
			return err
		}
		names = append(names, name)
	}
	order.Products = names
	var err error
	order.Date = time.Now().Add(3 * time.Hour) //, err = time.Parse("2006-01-02 15:04:05", date.Format("2006-01-02 15:04:05"))
	order.Status = "Оформлен"

	err = r.db.Create(&order).Error
	if err != nil {
		return err
	}
	err = r.DeleteByUser(order.UserUUID)
	if err != nil {
		return err
	}
	return nil
}

func (r *Repository) GetOrders(stDate, endDate, status string) ([]ds.Order, error) {
	var orders []ds.Order
	var err error
	st, err := url.QueryUnescape(status)
	if err != nil {
		return orders, err
	}
	if st == "" {
		if stDate == "" && endDate == "" {
			err = r.db.Order("date").Find(&orders).Error
			log.Println(orders[0].Status)
			return orders, err
		} else if stDate != "" && endDate == "" {
			err = r.db.Order("date").Where("date > ?", stDate).Find(&orders).Error
			return orders, err
		} else if stDate == "" && endDate != "" {
			err = r.db.Order("date").Where("date < ?", endDate).Find(&orders).Error
			return orders, err
		} else if stDate != "" && endDate != "" {
			err = r.db.Order("date").Where("date > ? and date < ?", stDate, endDate).Find(&orders).Error
			return orders, err
		}
	} else {
		if stDate == "" && endDate == "" {
			err = r.db.Order("date").Where("status = ?", st).Find(&orders).Error
			return orders, err
		} else if stDate != "" && endDate == "" {
			err = r.db.Order("date").Where("date > ? and status = ?", stDate, st).Find(&orders).Error
			return orders, err
		} else if stDate == "" && endDate != "" {
			err = r.db.Order("date").Where("date < ? and status = ?", endDate, st).Find(&orders).Error
			return orders, err
		} else if stDate != "" && endDate != "" {
			err = r.db.Order("date").Where("date > ? and date < ? and status = ?", stDate, endDate, st).Find(&orders).Error
			return orders, err
		}
	}

	return orders, nil
}

func (r *Repository) ChangeStatus(uuid uuid.UUID, status string) (int, error) {
	var order ds.Order
	err := r.db.First(&order, "uuid = ?", uuid).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 404, err
		}
		return 500, err
	}
	err = r.db.Model(&order).Update("Status", status).Error
	//if errors.Is(err, gorm.ErrRecordNotFound)
	if err != nil {
		return 500, err
	}
	return 0, nil
}
