package ds

type Product struct {
	ID          int `gorm:"primarykey"`
	Name        string
	Description string
	Price       int
}
