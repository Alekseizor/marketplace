package api

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func StartServer() {
	log.Println("Server start up")
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.LoadHTMLGlob("templates/*")
	r.GET("/home", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", gin.H{
			"title": "Marketplace",
		})
	})
	r.GET("/birthday", func(c *gin.Context) {
		c.HTML(http.StatusOK, "birthday.tmpl", gin.H{
			"title":    "My desired gifts",
			"presents": []string{"work in vk", "work in Yandex", "Maksim Konovalov", "Ilya Pavlyukov"},
		})
	})
	r.Static("/image", "./resourсes")
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
	log.Println("Server down")
}
