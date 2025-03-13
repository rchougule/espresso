package viperpkg

import (
	"log"

	"github.com/spf13/viper"
)

func InitConfig() {
	viper.SetConfigName("espressoconfig") // File name without extension
	viper.SetConfigType("yaml")           // File type
	// Search paths relative to where the binary runs in container
	viper.AddConfigPath("/app/espresso/configs") // Main config path in container
	viper.AddConfigPath("../../configs")         // For local development
	viper.AddConfigPath("./configs")             // Fallback path for local development

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file: %v", err)
	}
}
