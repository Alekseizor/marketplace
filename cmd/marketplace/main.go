package main

import (
	log "github.com/sirupsen/logrus"
	"marketplace/internal/pkg/app"
)

func main() {
	log.Println("Application start")
	app := app.New()
	app.Run()
	log.Println("Application terminated")
}
