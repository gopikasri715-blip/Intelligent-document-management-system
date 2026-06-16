# Database Design

## Documents Table

| Field Name     | Data Type | Description        |
| -------------- | --------- | ------------------ |
| document_id    | INTEGER   | Primary Key        |
| file_name      | TEXT      | Name of document   |
| category       | TEXT      | Document category  |
| upload_date    | DATE      | Upload date        |
| extracted_text | TEXT      | OCR extracted text |
| file_path      | TEXT      | Loc of stored file |
                                
---

## Users Table

| Field Name | Data Type | Description   |
| ---------- | --------- | ------------- |
| user_id    | INTEGER   | Primary Key   |
| username   | TEXT      | User name     |
| email      | TEXT      | Email address |
| password   | TEXT      | User password |
