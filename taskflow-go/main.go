package main

import (
	"github.com/gin-gonic/gin"
	"taskflow-go/handler"
)

func main() {
	r := gin.Default()

	r.POST("/stats", handler.GetStats)

	r.Run(":8081") // Go service
}

