package renderer

import (
	"github.com/go-rod/rod/lib/proto"
	"github.com/rchougule/espresso/lib/browser_manager"
	"github.com/rchougule/espresso/lib/templatestore"
)

type GetHtmlPdfInput struct {
	TemplateRequest templatestore.GetTemplateRequest
	Data            []byte
	ViewPort        *browser_manager.ViewportConfig
	PdfParams       *proto.PagePrintToPDF
	IsSinglePage    bool
}
