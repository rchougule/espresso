-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
    template_id VARCHAR(255) PRIMARY KEY,
    template_name VARCHAR(150) NOT NULL,
    template_content TEXT NOT NULL,
    json_schema TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert a basic sample template
INSERT INTO templates (template_id,template_name, template_content,json_schema)
VALUES ('template-1-uuid', "Registration Form Template",
'<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Registration Form</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 20px;
            color: #333;
        }
        .header { 
            text-align: center; 
            margin-bottom: 30px;
            border-bottom: 2px solid #eee;
            padding-bottom: 20px;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 15px;
        }
        .content { 
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
        }
        .form-group {
            margin-bottom: 20px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .form-label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
            color: #555;
        }
        .form-value {
            padding: 8px;
            background: #f9f9f9;
            border-radius: 4px;
        }
        .profile-image {
            max-width: 200px;
            border-radius: 50%;
            margin: 20px auto;
            display: block;
            border: 3px solid #eee;
        }
        .signature {
            margin-top: 40px;
            border-top: 1px dashed #ccc;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{.company_logo}}" alt="Company Logo" class="logo">
        <h1>Registration Form</h1>
        <p>Reference ID: {{.registration_id}}</p>
    </div>
    
    <div class="content">
        <img src="{{.profile_photo}}" alt="Profile Photo" class="profile-image">
        
        <div class="form-group">
            <div class="form-label">Personal Information</div>
            <div class="form-value">
                <p><strong>Name:</strong> {{.personal.full_name}}</p>
                <p><strong>Date of Birth:</strong> {{.personal.dob}}</p>
                <p><strong>Email:</strong> {{.personal.email}}</p>
                <p><strong>Phone:</strong> {{.personal.phone}}</p>
            </div>
        </div>

        <div class="form-group">
            <div class="form-label">Address</div>
            <div class="form-value">
                <p>{{.address.street}}</p>
                <p>{{.address.city}}, {{.address.state}} {{.address.zip}}</p>
                <p>{{.address.country}}</p>
            </div>
        </div>

        <div class="form-group">
            <div class="form-label">Emergency Contact</div>
            <div class="form-value">
                <p><strong>Name:</strong> {{.emergency.contact_name}}</p>
                <p><strong>Relationship:</strong> {{.emergency.relationship}}</p>
                <p><strong>Phone:</strong> {{.emergency.phone}}</p>
            </div>
        </div><div class="signature">
            <p><strong>Date:</strong> {{.metadata.submission_date}}</p>
            <img src="{{.signature_image}}" alt="Signature" style="max-width: 200px;">
            <p><strong>Signature of {{.personal.full_name}}</strong></p>
        </div>
    </div>
</body>
</html>',
'{
    "registration_id": "REG-2023-001",
    "company_logo": "https://www.shutterstock.com/image-vector/modern-vector-graphic-cubes-colorful-260nw-1960184035.jpg",
    "profile_photo": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "signature_image": "https://www.shutterstock.com/image-vector/handwritten-signature-signed-papers-documents-260nw-2248268539.jpg",
    "personal": {
        "full_name": "John Smith",
        "dob": "1990-01-15",
        "email": "john.smith@email.com",
        "phone": "+1-555-0123"
    },
    "address": {
        "street": "123 Main Street, Apt 4B",
        "city": "New York",
        "state": "NY",
        "zip": "10001",
        "country": "United States"
    },
    "emergency": {
        "contact_name": "Jane Smith",
        "relationship": "Spouse",
        "phone": "+1-555-0124"
    },
    "metadata": {
        "submission_date": "2025-03-07"
    }
}')
ON DUPLICATE KEY UPDATE template_content = VALUES(template_content), json_schema = VALUES(json_schema);

-- Insert a more complex template example
INSERT INTO templates (template_id,template_name,  template_content,json_schema)
VALUES ('template-2-uuid',  "Invoice Template",
'<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; }
        table, th, td { border: 1px solid #ddd; }
        th, td { padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .total { font-weight: bold; text-align: right; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Invoice #{{.invoice_id}}</h1>
        <p>Customer: {{.customer_name}}</p>
        <p>Date: {{.date}}</p>
    </div>
</body>
</html>','{"invoice_id":"1111", "customer_name":"John Doe", "date":"1st oct"}')
ON DUPLICATE KEY UPDATE template_content = VALUES(template_content), json_schema = VALUES(json_schema);