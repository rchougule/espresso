package renderer

import (
	"github.com/Zomato/espresso/pdfpack/pkg/browser_manager"
	"github.com/Zomato/espresso/pdfpack/pkg/templatestore"
	"github.com/go-rod/rod/lib/proto"
)

type GetHtmlPdfInput struct {
	TemplateRequest templatestore.GetTemplateRequest
	Data            []byte
	ViewPort        *browser_manager.ViewportConfig
	PdfParams       *proto.PagePrintToPDF
	IsSinglePage    bool
}
