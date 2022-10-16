package app

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	_ "marketplace/docs"
	"marketplace/internal/app/ds"
	"marketplace/internal/app/dsn"
	"marketplace/swagger/models"
	"math/rand"
	"net/http"
	"strconv"
)

type errorResponse struct {
	Message string `json:"message"`
}

func (a *Application) StartServer() {
	log.Println("Server start up")
	r := gin.New()
	api := r.Group("/api")
	{
		products := api.Group("/products")
		{
			products.POST("/create", a.CreateItem)
			products.GET("/", a.GetAllItems)
			products.GET("/item", a.GetItemById)
			products.PUT("/item", a.UpdateItem)
			products.DELETE("/item", a.DeleteItem)
		}
	}
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
				product := ds.Product{Name: productRandom[rand.Intn(4)], Description: productRandom[rand.Intn(4)], Price: rand.Intn(15000)}
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
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
	log.Println("Server down")
	log.Println("Server down")
}

// CreateItem godoc
// @Summary      Add a new product
// @Description  Adding a new product to database
// @Tags         Add
// @Produce      json
// @Param Price query int true "Цена"
// @Param Name query string true "Название"
// @Param Description query string true "Описание продукта"
// @Success      201  {object}  models.ModelProductCreated
// @Failure 500 {object} models.ModelError
// @Router       /api/products/create [Post]
func (a *Application) CreateItem(c *gin.Context) {
	price, _ := strconv.Atoi(c.Query("Price"))
	car := ds.Product{
		UUID:        uuid.New(),
		Name:        c.Query("Name"),
		Description: c.Query("Description"),
		Price:       price,
	}

	err := a.repo.CreateProduct(car)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			&models.ModelError{
				Description: "adding failed",
				Error:       "db error",
				Type:        "internal",
			})
		return
	}
	c.JSON(
		http.StatusOK,
		&models.ModelProductCreated{
			Success: true,
		})

}

// GetAllItems godoc
// @Summary      Get all records
// @Description  Get a list of all products
// @Tags         Info
// @Produce      json
// @Success      200  {object}  ds.Product
// @Failure 500 {object} models.ModelError
// @Router       /api/products [get]
func (a *Application) GetAllItems(c *gin.Context) {
	resp, err := a.repo.GetProducts()
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			&models.ModelError{
				Description: "can`t get a list",
				Error:       "db error",
				Type:        "internal",
			})
		return
	}
	c.JSON(http.StatusOK, resp)
}

// GetItemById   godoc
// @Summary      Get information for a product
// @Description  Get name, description, price for a product via uuid
// @Tags         Info
// @Produce      json
// @Param UUID query string true "UUID product"
// @Success      200  {object}  models.ModelProductData
// @Failure 	 500 {object} models.ModelError
// @Router       /api/products/item [get]
func (a *Application) GetItemById(c *gin.Context) {
	uuid := c.Query("UUID")
	log.Println(uuid)
	respName, respDesc, respPrice, err := a.repo.GetItemById(uuid)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			&models.ModelError{
				Description: "can`t get a price",
				Error:       "db error",
				Type:        "internal",
			})
		return
	}
	c.JSON(
		http.StatusOK,
		&models.ModelProductData{
			Name:        respName,
			Description: respDesc,
			Price:       strconv.Itoa(respPrice),
		})

}

// UpdateItem   godoc
// @Summary      Update product price
// @Description  Update a price for a product via its uuid
// @Tags         Update
// @Produce      json
// @Param UUID query string true "UUID product"
// @Param Price query int true "New price"
// @Success      200  {object}  models.ModelPriceUpdate
// @Failure 	 500 {object} models.ModelError
// @Router       /api/products/item [put]
func (a *Application) UpdateItem(c *gin.Context) {
	inputUuid, _ := uuid.Parse(c.Query("UUID"))
	newPrice, _ := strconv.Atoi(c.Query("Price"))
	err := a.repo.UpdateProduct(inputUuid, newPrice)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			&models.ModelError{
				Description: "delete failed",
				Error:       "db error",
				Type:        "internal",
			})
		return
	}
	c.JSON(
		http.StatusOK,
		&models.ModelProductDeleted{
			Delete: "successfully",
		})
}

// DeleteItem    godoc
// @Summary      Delete a product
// @Description  Delete a product via its uuid
// @Tags         Change
// @Produce      json
// @Param UUID query string true "UUID product"
// @Success      200  {object}  models.ModelProductDeleted
// @Failure 	 500 {object} models.ModelError
// @Router       /api/products/item [delete]
func (a *Application) DeleteItem(c *gin.Context) {
	uuid := c.Query("UUID")
	err := a.repo.DeleteProduct(uuid)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			&models.ModelError{
				Description: "delete failed",
				Error:       "db error",
				Type:        "internal",
			})
		return
	}
	c.JSON(
		http.StatusOK,
		&models.ModelProductDeleted{
			Delete: "successfully",
		})
}
