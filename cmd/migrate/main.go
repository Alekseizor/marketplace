package main

import (
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"marketplace/internal/app/ds"
	"marketplace/internal/app/dsn"
)

func main() {
	_ = godotenv.Load()
	log.Println(dsn.FromEnv())
	db, err := gorm.Open(postgres.Open(dsn.FromEnv()), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	err = db.AutoMigrate(&ds.Product{})
	if err != nil {
		panic("cant migrate db")
	}
}

func productRandom() {

}
