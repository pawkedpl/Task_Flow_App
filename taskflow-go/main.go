package main

import (
	"github.com/gin-gonic/gin"
	"taskflow-go/handler"
)

func main() {
	r := gin.Default()


	r.POST("/stats", handler.GetStats)


	r.POST("/send-code", handler.SendCode)

	r.Run(":8081")
}

