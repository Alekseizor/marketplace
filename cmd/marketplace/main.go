package main

import (
	log "github.com/sirupsen/logrus"
	"marketplace/internal/pkg/app"
)

//@title Marketplace API
//@version 1.0
//@description API Server for Marketplace

// @contact.name Aleksei
// @contact.url https://vk.com/alekseyzorkin
// @contact.email zorkin22@bk.ru

// @host localhost:8080
// @BasePath /
func main() {
	log.Println("Application start")
	app := app.New()
	app.Run()
	log.Println("Application terminated")
}
