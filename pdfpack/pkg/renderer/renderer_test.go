package renderer

import (
	"context"
	"testing"

	"github.com/Zomato/espresso/pdfpack/pkg/browser_manager"
	"github.com/Zomato/espresso/pdfpack/pkg/templatestore"
	"github.com/go-rod/rod/lib/proto"
	"github.com/stretchr/testify/assert"
)

func TestGetHtmlPdf(t *testing.T) {
	ctx := context.Background()

	tests := []struct {
		name        string
		input       *GetHtmlPdfInput
		wantErr     bool
		description string
	}{
		{
			name: "basic_template",
			input: &GetHtmlPdfInput{
				TemplateRequest: templatestore.GetTemplateRequest{
					TemplateBytes: []byte(`<html><body><h1>{{.title}}</h1></body></html>`),
				},
				Data: []byte(`{"title":"Test Document"}`),
				ViewPort: &browser_manager.ViewportConfig{
					Width:             794,
					Height:            1124,
					DeviceScaleFactor: 1.0,
				},
				PdfParams: &proto.PagePrintToPDF{
					PrintBackground: true,
					MarginTop:       float64Ptr(0.4),
					MarginBottom:    float64Ptr(0.4),
				},
			},
			wantErr:     false,
			description: "Should generate PDF from basic template",
		},
		{
			name: "invalid_template",
			input: &GetHtmlPdfInput{
				TemplateRequest: templatestore.GetTemplateRequest{
					TemplateBytes: []byte(`<html><body><h1>{{.invalid}}</h1></body></html>`),
				},
				Data: []byte(`{"title":"Test Document"}`),
				ViewPort: &browser_manager.ViewportConfig{
					Width:             794,
					Height:            1124,
					DeviceScaleFactor: 1.0,
				},
			},
			wantErr:     true,
			description: "Should fail with invalid template variables",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			pdf, err := GetHtmlPdf(ctx, tt.input, nil)
			if tt.wantErr {
				assert.Error(t, err)
				return
			}
			assert.NoError(t, err)
			assert.NotNil(t, pdf)
			defer pdf.Close()

			// Read first few bytes to verify it's a PDF
			buf := make([]byte, 4)
			_, err = pdf.Read(buf)
			assert.NoError(t, err)
			assert.Equal(t, []byte("%PDF"), buf)
		})
	}
}

func float64Ptr(v float64) *float64 {
	return &v
}
