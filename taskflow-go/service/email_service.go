package service

import (
	"context"
	"fmt"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/ses"
	"github.com/aws/aws-sdk-go-v2/service/ses/types"
)

func SendEmail(to string, code string) error {
	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithRegion("eu-north-1"),
	)
	if err != nil {
		return err
	}

	client := ses.NewFromConfig(cfg)

	input := &ses.SendEmailInput{
		Source: awsString("no-reply@taskify.pl"),
		Destination: &types.Destination{
			ToAddresses: []string{to},
		},
		Message: &types.Message{
			Subject: &types.Content{
				Data: awsString("Taskify - Verification Code"),
			},
			Body: &types.Body{
				Text: &types.Content{
					Data: awsString(fmt.Sprintf("Your verification code is: %s", code)),
				},
			},
		},
	}

	_, err = client.SendEmail(context.TODO(), input)
	return err
}

func awsString(s string) *string {
	return &s
}