package service

import (
	"time"
	"taskflow-go/model"
)

type Stats struct {
	Total     int `json:"total"`
	Completed int `json:"completed"`
	Overdue   int `json:"overdue"`
}

func CalculateStats(tasks []model.Task) Stats {
	now := time.Now()

	total := len(tasks)
	completed := 0
	overdue := 0

	for _, t := range tasks {
		if t.Status == "DONE" {
			completed++
		}

		end, _ := time.Parse(time.RFC3339, t.EndDate)
		if t.Status != "DONE" && end.Before(now) {
			overdue++
		}
	}

	return Stats{
		Total:     total,
		Completed: completed,
		Overdue:   overdue,
	}
}

