package models

type ModelProductPrice struct {
	Price int `json:"price,omitempty"`
}

type ModelPriceChanged struct {
	Success bool `json:"success,omitempty"`
}
