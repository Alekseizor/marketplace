package app

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"log"
	_ "marketplace/docs"
	"marketplace/internal/app/ds"
	"marketplace/internal/app/role"
	"marketplace/swagger/models"
	"net/http"
)

type errorResponse struct {
	Message string `json:"message"`
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, UPDATE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
func (a *Application) StartServer() {
	log.Println("Server start up")

	r := gin.Default()

	r.Use(CORSMiddleware())

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	r.GET("/products", a.GetAllItems)
	r.GET("/products/:uuid", a.GetItemById)

	r.GET("/products/price/:uuid", a.GetProductPrice)

	r.POST("/cart", a.AddToCart)
	r.POST("/orders", a.AddOrder)
	r.POST("/login", a.Login)
	r.POST("/sign_up", a.Register)
	r.GET("/logout", a.Logout)
	r.GET("/role", a.Role)

	r.DELETE("/cart/:uuid", a.DeleteFromCart)

	r.Use(a.WithAuthCheck(role.Buyer, role.Manager, role.Admin)).GET("/cart", a.GetCart)
	r.Use(a.WithAuthCheck(role.Manager)).POST("/products", a.CreateItem)
	r.Use(a.WithAuthCheck(role.Manager)).GET("/orders", a.GetOrders)
	r.Use(a.WithAuthCheck(role.Manager)).GET("/user/:uuid", a.GetUser)
	r.Use(a.WithAuthCheck(role.Manager)).PUT("/orders/:uuid", a.ChangeStatus)
	r.Use(a.WithAuthCheck(role.Manager)).DELETE("/products/:uuid", a.DeleteItem)
	r.Use(a.WithAuthCheck(role.Manager)).PUT("/products/:uuid", a.UpdateItem)

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")

	log.Println("Server down")
}

// CreateItem godoc
// @Summary      Add a new product
// @Description  Adding a new product to database
// @Tags         Add
// @Produce      json
// @Param Price query int true "Цена"
// @Param Name query string true "Название"
// @Param Image query string true "Ссылка на фото"
// @Param Description query string true "Описание продукта"
// @Success      201  {object}  models.ModelProductCreated
// @Failure 500 {object} models.ModelError
// @Router       /products [post]
func (a *Application) CreateItem(c *gin.Context) {
	product := ds.Product{}
	if err := c.BindJSON(&product); err != nil {
		c.JSON(
			http.StatusInternalServerError,
			&models.ModelError{
				Description: "adding failed",
				Error:       "db error",
				Type:        "internal",
			})
		return
	}
	if product.Price <= 0 {
		c.JSON(
			http.StatusBadRequest,
			&models.ModelError{
				Description: "The price cannot be non -negative",
				Error:       "Price error",
				Type:        "client",
			})
		return
	}
	product.UUID = uuid.New()
	err := a.repo.CreateProduct(product)
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
// @Router       /products [get]
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
// @Router       /products/:uuid [get]
func (a *Application) GetItemById(c *gin.Context) {
	uuid, err := uuid.Parse(c.Param("uuid"))
	if err != nil {
		log.Println("failed to create uuid from string")
		return
	}
	//uuid := c.Query("UUID")
	resp, respName, err := a.repo.GetItemById(uuid)
	if err != nil {
		if respName == "no product found with this uuid" {
			c.JSON(
				http.StatusBadRequest,
				&models.ModelError{
					Description: "No product found with this uuid",
					Error:       "uuid error",
					Type:        "client",
				})
			return
		}
		c.JSON(
			http.StatusInternalServerError,
			&models.ModelError{
				Description: "can`t get a price",
				Error:       "db error",
				Type:        "internal",
			})
		return
	}
	c.JSON(http.StatusOK, resp)
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
// @Router      /products/:uuid [put]
func (a *Application) UpdateItem(gCtx *gin.Context) {
	UUID, err := uuid.Parse(gCtx.Param("uuid"))
	if err != nil {
		gCtx.JSON(
			http.StatusBadRequest,
			&models.ModelError{
				Description: "Invalid UUID format",
				Error:       models.Err400,
				Type:        models.TypeClientReq,
			})
		return
	}
	product := ds.Product{}
	err = gCtx.BindJSON(&product)
	if err != nil {
		gCtx.JSON(
			http.StatusBadRequest,
			&models.ModelError{
				Description: "The price is negative or not int",
				Error:       models.Err400,
				Type:        models.TypeClientReq,
			})
		return
	}
	resp, err := a.repo.UpdateProduct(UUID, product)
	if err != nil {
		if resp == 404 {
			gCtx.JSON(
				http.StatusNotFound,
				&models.ModelError{
					Description: "UUID Not Found",
					Error:       models.Err404,
					Type:        models.TypeClientReq,
				})
			return
		} else {
			gCtx.JSON(
				http.StatusInternalServerError,
				&models.ModelError{
					Description: "Change failed",
					Error:       models.Err500,
					Type:        models.TypeInternalReq,
				})
			return
		}
	}

	gCtx.JSON(
		http.StatusOK,
		&models.ModelPriceChanged{
			Success: true,
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
// @Router       /products/:uuid [delete]
func (a *Application) DeleteItem(c *gin.Context) {
	uuid, err := uuid.Parse(c.Param("uuid"))
	//uuid := c.Query("UUID")
	messageError, err := a.repo.DeleteProduct(uuid)
	if err != nil {
		if messageError == "no product found with this uuid" {
			c.JSON(
				http.StatusBadRequest,
				&models.ModelError{
					Description: "No product found with this uuid",
					Error:       "uuid error",
					Type:        "client",
				})
			return
		}
		c.JSON(
			http.StatusInternalServerError,
			&models.ModelError{
				Description: "Update failed",
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

func (a *Application) GetCart(gCtx *gin.Context) {
	jwtStr := gCtx.GetHeader("Authorization")
	userUUID := a.GetUserByToken(jwtStr)
	resp, err := a.repo.GetCart(userUUID)
	if err != nil {
		gCtx.JSON(
			http.StatusInternalServerError,
			&models.ModelError{
				Description: "Can't get a list of promo codes",
				Error:       "uuid error",
				Type:        "client",
			})
		return
	}
	gCtx.JSON(http.StatusOK, resp)
}

func (a *Application) AddToCart(c *gin.Context) {
	jwtStr := c.GetHeader("Authorization")
	userUUID := a.GetUserByToken(jwtStr)
	cart := ds.Cart{}
	err := c.BindJSON(&cart)
	if err != nil {
		c.JSON(
			http.StatusBadRequest,
			&models.ModelError{
				Description: "No product found with this uuid",
				Error:       "uuid error",
				Type:        "client",
			})
		return
	}
	cart.UUID = uuid.New()
	cart.UserUUID = userUUID
	err = a.repo.AddToCart(cart)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			&models.ModelError{
				Description: "Update failed",
				Error:       "db error",
				Type:        "internal",
			})
		return
	}
	c.JSON(
		http.StatusOK,
		&models.ModelCartCreated{
			Success: "successfully",
		})

}

func (a *Application) DeleteFromCart(c *gin.Context) {
	//jwtStr := c.GetHeader("Authorization")
	//userUUID := a.GetUserByToken(jwtStr)
	store, err := uuid.Parse(c.Param("uuid"))
	if err != nil {
		log.Println(store)
		c.JSON(
			http.StatusInternalServerError,
			&models.ModelError{
				Description: "Не получилось преобразовать в UUID",
				Error:       "UUID",
				Type:        "internal",
			})
		return
	}
	//UUID := c.Param("uuid")
	log.Println("z nen")
	_, err = a.repo.DeleteCart(store)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			&models.ModelError{
				Description: "Update failed",
				Error:       "db error",
				Type:        "internal",
			})
		return
	}
	c.JSON(
		http.StatusOK,
		&models.ModelCartDeleted{
			Success: "successfully",
		})
}

func (a *Application) GetCarPrice(gCtx *gin.Context) {
	uuid, err := uuid.Parse(gCtx.Param("uuid"))
	if err != nil {
		gCtx.JSON(
			http.StatusBadRequest,
			&models.ModelError{
				Description: "Invalid UUID format",
				Error:       models.Err400,
				Type:        models.TypeClientReq,
			})
		return
	}
	resp, err := a.repo.GetProductPrice(uuid)
	if err != nil {
		if resp == 404 {
			gCtx.JSON(
				http.StatusNotFound,
				&models.ModelError{
					Description: "UUID Not Found",
					Error:       models.Err404,
					Type:        models.TypeClientReq,
				})
			return
		} else {
			gCtx.JSON(
				http.StatusInternalServerError,
				&models.ModelError{
					Description: "Get car price failed",
					Error:       models.Err500,
					Type:        models.TypeInternalReq,
				})
			return
		}
	}
	gCtx.JSON(
		http.StatusOK,
		&models.ModelProductPrice{
			Price: resp,
		})

}

func (a *Application) GetProductPrice(gCtx *gin.Context) {
	uuid, err := uuid.Parse(gCtx.Param("uuid"))
	if err != nil {
		gCtx.JSON(
			http.StatusBadRequest,
			&models.ModelError{
				Description: "Invalid UUID format",
				Error:       models.Err400,
				Type:        models.TypeClientReq,
			})
		return
	}
	resp, err := a.repo.GetProductPrice(uuid)
	if err != nil {
		if resp == 404 {
			gCtx.JSON(
				http.StatusNotFound,
				&models.ModelError{
					Description: "UUID Not Found",
					Error:       models.Err404,
					Type:        models.TypeClientReq,
				})
			return
		} else {
			gCtx.JSON(
				http.StatusInternalServerError,
				&models.ModelError{
					Description: "Get car price failed",
					Error:       models.Err500,
					Type:        models.TypeInternalReq,
				})
			return
		}
	}
	gCtx.JSON(
		http.StatusOK,
		&models.ModelProductPrice{
			Price: resp,
		})

}
