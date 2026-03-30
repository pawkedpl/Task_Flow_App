package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"taskflow-go/service"
)

type EmailRequest struct {
	Email string `json:"email"`
	Code  string `json:"code"`
}

func SendCode(c *gin.Context) {
	var req EmailRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	err := service.SendEmail(req.Email, req.Code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to send email"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "email sent"})
}