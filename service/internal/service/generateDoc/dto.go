package generateDoc

type PDFDto struct {
	ReqId              string
	InputTemplatePath  string
	InputTemplateUUID  string
	InputFileBytes     []byte
	OutputTemplatePath string
	Content            []byte
	ViewPort           *ViewportConfig
	PdfParams          *PDFParams
	SignParams         *SignParams
	OutputFileBytes    []byte
}

type PDFMessageData struct {
	Template  string
	Content   []byte
	ViewPort  *ViewportConfig
	PdfParams *PDFParams
}

type PDFMessage struct {
	DocType string
	ReqId   string
	Data    PDFMessageData
}

type ImageMessageData struct {
	TemplateId string
	Content    []byte
	ViewPort   *ViewportConfig
}

type ImageMessage struct {
	DocType string
	ReqId   string
	Data    ImageMessageData
}
type SignPDFDto struct {
	ReqId           string
	InputFilePath   string
	InputFileBytes  []byte
	OutputFilePath  string
	OutputFileBytes []byte
	SignParams      *SignParams
}

type PDFParams struct {
	Landscape           bool    `json:"landscape,omitempty"`
	DisplayHeaderFooter bool    `json:"display_header_footer,omitempty"`
	PrintBackground     bool    `json:"print_background,omitempty"`
	PageRanges          string  `json:"page_ranges,omitempty"`
	HeaderTemplate      string  `json:"header_template,omitempty"`
	FooterTemplate      string  `json:"footer_template,omitempty"`
	PreferCssPageSize   bool    `json:"prefer_css_page_size,omitempty"`
	MarginTop           float64 `json:"margin_top,omitempty"`
	MarginBottom        float64 `json:"margin_bottom,omitempty"`
	MarginLeft          float64 `json:"margin_left,omitempty"`
	MarginRight         float64 `json:"margin_right,omitempty"`
	PaperWidth          float64 `json:"paper_width,omitempty"`
	PaperHeight         float64 `json:"paper_height,omitempty"`
	IsSinglePage        bool    `json:"is_single_page,omitempty"`
}
type ViewportConfig struct {
	Width             int32   `json:"width,omitempty"`
	Height            int32   `json:"height,omitempty"`
	DeviceScaleFactor float64 `json:"device_scale_factor,omitempty"`
	IsMobile          bool    `json:"is_mobile,omitempty"`
}

type SignParams struct {
	SignPdf       bool   `json:"sign_pdf,omitempty"`
	CertConfigKey string `json:"cert_config_key,omitempty"`
}

type TemplateListData struct {
	TemplateId   string `json:"template_id,omitempty"`
	TemplateName string `json:"template_name,omitempty"`
	CreatedAt    string `json:"created_at,omitempty"`
	UpdatedAt    string `json:"updated_at,omitempty"`
}
