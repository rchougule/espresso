# Quick Start Guide

This guide will help you run the Espresso service using Docker Compose.

## Prerequisites

- Docker and Docker Compose
- Make (optional)

## Running the Service

1. All required files are already provided in the repository:
   - HTML templates in `service/inputfiles/templates/`
   - Sample PDFs in `service/inputfiles/inputPDFs/`
   - Test certificates in `service/inputfiles/certificates/`
   - Configuration in `configs/espressoconfig.yaml`

2. Build and start all containers using make
```bash
make
```
or directly run docker compose from root
```bash
	DOCKERFILE=service/Dockerfile \
    docker-compose -f service/docker-compose.yml build && \
    docker-compose -f service/docker-compose.yml up -d 
```
then open http://localhost:3000 on a browser to access the espresso console

This will:
- Build all Docker containers
- Start MySQL for template storage
- Initialize LocalStack for S3 storage
- Launch the PDF service
- Start the web UI
- Open http://localhost:3000 in your browser

## Using the Web UI

1. **Template Management**:
   - Go to http://localhost:3000/templates
   - Click "Create New Template"
   - Fill in:
     - Template Name
     - HTML Content
     - JSON Schema (for form fields, placeholders, images, etc) 
   - Click "Save Template"

2. **Generate PDF**:
   - Go to http://localhost:3000/generate
   - Select a template
   - Input your JSON data
   - Choose PDF options:
     - Margins
     - Paper size
     - Orientation
   - Click "Generate PDF"
   - Download or view the generated PDF

3. **Sign PDF**:
   - Go to http://localhost:3000/sign
   - Upload a PDF
   - Select signing certificate (configured in espressoconfig.yaml)
   - Click "Sign PDF"
   - Download the signed PDF

## Testing via API

1. **Create Template**:
```bash
curl -X POST http://localhost:8081/templates \
  -H "Content-Type: application/json" \
  -d '{
    "template_name": "Test Template",
    "template_content": "<html><body><h1>{{.title}}</h1></body></html>",
    "json_schema": "{\"title\": \"string\"}"
  }'
```

2. **Generate PDF**:
```bash
curl -X POST http://localhost:8081/generate \
  -H "Content-Type: application/json" \
  -d '{
    "template_id": "template-1-uuid",
    "content": {"title": "Hello World"},
    "pdf_params": {
      "landscape": false,
      "margin_top": 0.4,
      "margin_bottom": 0.4
    }
  }'
```

3. **Sign PDF**:
```bash
curl -X POST http://localhost:8081/sign \
  -H "Content-Type: application/json" \
  -d '{
    "input_file_path": "path/to/input.pdf",
    "output_file_path": "path/to/output.pdf",
    "sign_params": {
      "sign_pdf": true,
      "cert_config_key": "cert1"
    }
  }'
```

## Troubleshooting

1. **Certificate Issues**:
   - Verify certificate files exist in the specified path
   - Check certificate password in config
   - Ensure certificate format is correct (X.509 for cert, PKCS#8 for key)

2. **Storage Issues**:
   - For disk storage: Check file permissions
   - For S3: Verify LocalStack is running (`docker ps`)
   - For MySQL: Check connection string in config

3. **Template Issues**:
   - Verify HTML is valid
   - Check JSON schema matches your data
   - Templates must be accessible from configured storage

4. **Common Errors**:
   - "Template not found": Check storage configuration
   - "Certificate load failed": Verify certificate paths and passwords
   - "PDF generation failed": Check HTML template validity
   - "Storage error": Verify storage configuration and permissions

## Next Steps

- Check the API documentation for more endpoints
- Review the Integration Guide for programmatic usage
- Explore advanced features like custom headers/footers
- Configure production settings for deployment

For more detailed information, refer to the [Integration Guide](Integration.md).
