package app

import (
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"marketplace/internal/app/ds"
	"marketplace/internal/app/dsn"
	"math/rand"
	"net/http"
	"strconv"
)

func (a *Application) StartServer() {
	log.Println("Server start up")
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.GET("/product", func(c *gin.Context) {
		id := c.Query("id")
		if id != "" {
			log.Printf("id recived %s\n", id)
			intID, err := strconv.Atoi(id) // пытаемся привести это к чиселке
			if err != nil {                // если не получилось
				log.Printf("cant convert id %v", err)
				c.Error(err)
				return
			}
			log.Println("я тут")
			product, err := a.repo.GetProductByID(intID)
			if err != nil { // если не получилось
				log.Printf("cant get product by id %v", err)
				c.Error(err)
				return
			}

			c.JSON(http.StatusOK, gin.H{
				"product_description": product.Description,
				"product_name":        product.Name,
				"product_price":       product.Price,
			})
			return
		}
		create := c.Query("create")
		if create != "" {
			log.Printf("id recived %s\n", create)
			if create == "true" {
				productRandom := [5]string{"donkey toy", "sneakers", "sweater", "T-shirt", "pacifier"}
				product := ds.Product{ID: rand.Intn(10000), Name: productRandom[rand.Intn(4)], Description: productRandom[rand.Intn(4)], Price: rand.Intn(15000)}
				db, err := gorm.Open(postgres.Open(dsn.FromEnv()), &gorm.Config{})
				if err != nil {
					panic("failed to connect database")
				}
				db.Create(&product)
			}
		}
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
