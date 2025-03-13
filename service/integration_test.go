package main

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestPDFGenerationAPI(t *testing.T) {
	serviceURL := "http://localhost:8081"

	tests := []struct {
		name       string
		endpoint   string
		method     string
		payload    interface{}
		wantStatus int
		isPDF      bool // Add this field to distinguish PDF responses
	}{
		{
			name:     "generate_pdf_success",
			endpoint: "/generate-pdf-stream",
			method:   "POST",
			payload: map[string]interface{}{
				"template_uuid": "template-1-uuid",
				"content": map[string]interface{}{
					"page_heading": "Test Document",
					"header_image": "https://b.zmtcdn.com/data/o2_assets/6a20174bed91e997b373130a5ac5e13e1739881110.png",
				},
				"landscape":   false,
				"margin_inch": 0.4,
			},
			wantStatus: http.StatusOK,
			isPDF:      true, // Expect PDF response
		},
		{
			name:     "create_template_success",
			endpoint: "/create-template",
			method:   "POST",
			payload: map[string]interface{}{
				"template_name": "Test Template new",
				"template_html": "<html><body><h1>{{.title}}</h1></body></html>",
				"json":          `{"title": "some title test"}`,
			},
			wantStatus: http.StatusCreated,
			isPDF:      false, // Expect JSON response
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			payloadBytes, err := json.Marshal(tt.payload)
			require.NoError(t, err)

			req, err := http.NewRequest(tt.method, serviceURL+tt.endpoint, bytes.NewBuffer(payloadBytes))
			require.NoError(t, err)
			req.Header.Set("Content-Type", "application/json")

			resp, err := http.DefaultClient.Do(req)
			require.NoError(t, err)
			defer resp.Body.Close()

			assert.Equal(t, tt.wantStatus, resp.StatusCode)

			if tt.isPDF {
				// For PDF endpoint, verify PDF content
				assert.Equal(t, "application/pdf", resp.Header.Get("Content-Type"))
				pdfBytes, err := io.ReadAll(resp.Body)
				require.NoError(t, err)
				assert.True(t, len(pdfBytes) > 0)
				assert.True(t, bytes.HasPrefix(pdfBytes, []byte("%PDF"))) // Check PDF signature
			} else {
				// For other endpoints, verify JSON response
				var result map[string]interface{}
				err = json.NewDecoder(resp.Body).Decode(&result)
				require.NoError(t, err)
				status, ok := result["status"].(map[string]interface{})
				require.True(t, ok)
				assert.Equal(t, "success", status["status"])
			}
		})
	}
}
