package models

type ModelProductData struct {
	Name        string `json:"name,omitempty"`
	Description string `json:"description,omitempty"`
	Price       string `json:"price,omitempty"`
}
