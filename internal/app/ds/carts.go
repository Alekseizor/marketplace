package ds

import "github.com/google/uuid"

type Cart struct {
	UUID      uuid.UUID `db:"uuid" gorm:"type:uuid;primary_key;"`
	StoreUUID uuid.UUID //товар
	UserUUID  uuid.UUID //покупатель
}
