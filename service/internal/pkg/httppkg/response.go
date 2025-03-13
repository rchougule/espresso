package httppkg

import (
	"encoding/json"
	"net/http"
)

func RespondWithError(w http.ResponseWriter, message string, statusCode int) {
	errorResponse := map[string]interface{}{
		"status": map[string]string{
			"status":  "failed",
			"message": message,
		},
	}

	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(errorResponse)
}
