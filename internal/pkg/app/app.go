package app

import (
	"context"
	"github.com/joho/godotenv"
	log "github.com/sirupsen/logrus"
	"marketplace/internal/app/config"
	"marketplace/internal/app/dsn"
	"marketplace/internal/app/repository"
)

type Application struct {
	cfg  *config.Config
	repo *repository.Repository
}

func (a *Application) Run() {
	a.StartServer()
}
func New() *Application {
	_ = godotenv.Load()
	repos, err := repository.New(dsn.FromEnv())
	if err != nil {
		log.Error(err)
	}
	var ctx context.Context
	cfg, err := config.NewConfig(ctx)
	if err != nil {
		log.Error(err)
	}
	return &Application{cfg: cfg, repo: repos}
}
