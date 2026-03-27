package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"taskflow-go/model"
	"taskflow-go/service"
)

func GetStats(c *gin.Context) {
	var tasks []model.Task

	if err := c.ShouldBindJSON(&tasks); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid data"})
		return
	}

	stats := service.CalculateStats(tasks)

	c.JSON(http.StatusOK, stats)
}

