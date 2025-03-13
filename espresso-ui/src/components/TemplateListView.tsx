import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { SearchIcon, Printer, Eye } from "lucide-react";
import Modal from "@/components/molecules/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  generatePdfReq,
  getTemplateHtmlAndJson,
  getTemplateListing,
} from "./EspressoConsole/apis";
import { getHtmlFromHtmlTemplate } from "./EspressoConsole/helper";

type Template = {
  template_id: string;
  template_name: string;
  created_at: string;
  updated_at: string;
}

type PdfGenerationRequest = {
  template_uuid: string | null;
  content: Record<string, unknown>;
  sign_pdf: boolean;
}

const TemplateListView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(
    null
  );
  const [iframeSrcDoc, setIframeSrcDoc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [json, setJson] = useState<string>("{}");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const filteredTemplates = templates?.filter(
    (template) =>
      template.template_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.template_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const populateData = (htmlValue: string, jsonValue: string) => {
    try {
      const data = JSON.parse(jsonValue);
      const populatedHtml = getHtmlFromHtmlTemplate(htmlValue, data);
      setIframeSrcDoc(populatedHtml);
    } catch (error) {
      console.error("Error populating template:", error);
      setIframeSrcDoc(
        "<html><body><p>Error populating template</p></body></html>"
      );
      toast.error("Error populating template: " + (error as Error).message);
    }
  };

  const handlePreviewClick = async (templateId: string) => {
    setShowPreviewModal(true);
    setPreviewTemplateId(templateId);
    setIsLoading(true);
    try {
      const response = await getTemplateHtmlAndJson(templateId);

      const template_html = response.template_html;
      const json = response.json || "{}";

      setJson(json);

      populateData(template_html, json);
    } catch (error) {
      console.error("Error loading preview:", error);
      setIframeSrcDoc("<html><body><p>Error loading preview</p></body></html>");
      toast.error("Error loading preview: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const generateUnsignedPdf = () => {
    const body: PdfGenerationRequest = {
      template_uuid: previewTemplateId,
      content: JSON.parse(json),
      sign_pdf: false,
    };

    generatePdf(body)
  };

  const generateSignedPdf = () => {
    const body: PdfGenerationRequest = {
      template_uuid: previewTemplateId,
      content: JSON.parse(json),
      sign_pdf: true,
    };

    generatePdf(body)
  };

  const generatePdf = async (body: PdfGenerationRequest) => {
    try {
      const response = await generatePdfReq(body);

      const blob = new Blob([response], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `template-${previewTemplateId?.substring(0, 8)}.pdf`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error(`Error generating PDF: ${(error as Error).message || "Unknown error"}`);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await getTemplateListing();
        setTemplates(response.data || []);
      } catch (error) {
        console.error("Error fetching templates:", error);
        toast.error(`Failed to fetch templates: ${(error as Error).message || "Unknown error"}`);
        setTemplates([]);
      }
    };
    
    fetchTemplates();
  }, []);

  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Template Library
      </h1>
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search templates..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-80 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link
          href={"/create-template"}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium flex items-center shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          CREATE NEW
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {filteredTemplates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-800">
              No templates found
            </h3>
            <p className="mt-1 text-gray-500">
              {searchQuery
                ? "Try adjusting your search query"
                : "No templates available"}
            </p>
            {searchQuery && (
              <button
                className="mt-4 text-red-600 hover:text-red-700"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      TEMPLATE NAME
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CREATED AT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTemplates.map((template, idx) => (
                    <tr
                      key={template.template_id}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors duration-150`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-red-500 to-red-600 rounded-md flex items-center justify-center text-white shadow-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {template.template_name}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 font-mono flex items-center">
                              <span className="bg-gray-100 px-1.5 py-0.5 rounded">
                                {template.template_id.substring(0, 8)}...
                                {template.template_id.substring(
                                  template.template_id.length - 4
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {(() => {
                            try {
                              const date = new Date(template.created_at);
                              return date.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              });
                            } catch (e) {
                              console.error(e);
                              return template.created_at;
                            }
                          })()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {(() => {
                            try {
                              const date = new Date(template.created_at);
                              return date.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              });
                            } catch (e) {
                              console.error(e);
                              return "";
                            }
                          })()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() =>
                            handlePreviewClick(template.template_id)
                          }
                          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Eye className="h-4 w-4 mr-1.5 text-blue-600" />
                          Preview
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  disabled={true}
                >
                  Previous
                </button>
                <button
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  disabled={true}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">
                      {filteredTemplates.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredTemplates.length}
                    </span>{" "}
                    results
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        open={showPreviewModal}
        setOpen={setShowPreviewModal}
        title="Template Preview"
        fullWidth={true}
        className={
          isFullscreen
            ? "fixed inset-0 z-[100] m-0 rounded-none max-w-full"
            : ""
        }
      >
        <div className={isFullscreen ? "h-full" : ""}>
          <div
            className={
              isLoading
                ? "m-0 min-h-[600px] flex items-center justify-center"
                : "relative m-0 border border-gray-200"
            }
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="h-12 w-12 border-4 border-gray-300 border-t-red-500 rounded-full"></div>
                <p className="ml-3 text-gray-500">Loading preview...</p>
              </div>
            ) : (
              <>
                <div className="bg-gray-100 p-3 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex gap-1">
                    <button
                      onClick={generateUnsignedPdf}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-sm rounded flex items-center shadow-sm transition-all duration-150"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Generate PDF
                    </button>
                    <button
                      onClick={generateSignedPdf}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-sm rounded flex items-center shadow-sm transition-all duration-150"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Generate Signed PDF
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={toggleFullscreen}
                      className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 text-sm rounded flex items-center transition-colors duration-150"
                    >
                      {isFullscreen ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414 1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    </button>
                  </div>
                </div>
                <iframe
                  ref={iframeRef}
                  srcDoc={iframeSrcDoc}
                  className={`w-full ${
                    isFullscreen ? "h-[calc(100vh-136px)]" : "h-[600px]"
                  }`}
                  title="Template Preview"
                  sandbox="allow-same-origin allow-scripts"
                />
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TemplateListView;
