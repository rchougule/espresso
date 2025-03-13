package pdf_generation

import (
	"encoding/json"

	"github.com/Zomato/espresso/service/internal/service/generateDoc"
)

type GeneratePDFRequest struct {
	InputFilePath     string                      `json:"input_file_path,omitempty"`
	InputFileBytes    []byte                      `json:"input_file_bytes,omitempty"`
	InputTemplateUuid string                      `json:"input_template_uuid,omitempty"`
	OutputFilePath    string                      `json:"output_file_path,omitempty"`
	Content           json.RawMessage             `json:"content,omitempty"`
	Viewport          *generateDoc.ViewportConfig `json:"viewport"`
	PdfParams         *generateDoc.PDFParams      `json:"pdf_params,omitempty"`
	SignParams        *generateDoc.SignParams     `json:"sign_params,omitempty"`
}

type GeneratePDFResponse struct {
	OutputFilePath  string `json:"output_file_path,omitempty"`
	OutputFileBytes []byte `json:"output_file_bytes,omitempty"`
	Error           string `json:"error,omitempty"`
}
type PDFRequest struct {
	TemplateUUID string          `json:"template_uuid"`
	Content      json.RawMessage `json:"content"` // Using RawMessage to keep JSON as-is
	Landscape    bool            `json:"landscape,omitempty"`
	SinglePage   bool            `json:"single_page,omitempty"`
	MarginInch   float64         `json:"margin_inch,omitempty"`
	Filename     string          `json:"filename,omitempty"` // Optional filename for download
	SignPdf      bool            `json:"sign_pdf,omitempty"`
}

// PDFResponse represents the structure for successful responses
type PDFResponse struct {
	Status      string `json:"status"`
	Message     string `json:"message"`
	TimeInMs    int64  `json:"time_in_ms"`
	FileName    string `json:"file_name,omitempty"`
	FileSize    int    `json:"file_size,omitempty"`
	DownloadURL string `json:"download_url,omitempty"`
}

type SignPDFRequest struct {
	InputFilePath  string                  `json:"input_file_path,omitempty"`
	InputFileBytes []byte                  `json:"input_file_bytes,omitempty"`
	OutputFilePath string                  `json:"output_file_path,omitempty"`
	SignParams     *generateDoc.SignParams `json:"sign_params,omitempty"`
}

type SignPDFResponse struct {
	OutputFilePath  string `json:"output_file_path,omitempty"`
	OutputFileBytes []byte `json:"output_file_bytes,omitempty"`
	Error           string `json:"error,omitempty"`
}

type GetAllTemplatesResponse struct {
	TotalRecords int32                           `json:"total_records,omitempty"`
	Data         []*generateDoc.TemplateListData `json:"data,omitempty"`
	Error        string                          `json:"error,omitempty"`
}

type GetTemplateByIdRequest struct {
	TemplateId string `json:"template_id"`
}

type GetTemplateByIdResponse struct {
	TemplateHtml string `json:"template_html"`
	Json         string `json:"json"`
	TemplateName string `json:"template_name"`
	Error        string `json:"error,omitempty"`
}

type CreateTemplateRequest struct {
	TemplateName string `json:"template_name"`
	TemplateHtml string `json:"template_html"`
	Json         string `json:"json"`
}

type CreateTemplateResponse struct {
	TemplateId string `json:"template_id"`
	Error      string `json:"error,omitempty"`
}
