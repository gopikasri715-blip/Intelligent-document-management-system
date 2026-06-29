# Intelligent Document Management System

## Database Relationships

The IDMS database is designed to manage users, documents, OCR data, and document categories efficiently.

---

## Tables Overview

### 1. Users Table

Stores user information.

| Field Name | Data Type | Description   |
| ---------- | --------- | ------------- |
| user_id    | INTEGER   | Primary Key   |
| username   | TEXT      | User name     |
| email      | TEXT      | User email    |
| password   | TEXT      | User password |

---

### 2. Documents Table

Stores uploaded document details.

| Field Name     | Data Type | Description                 |
| -------------- | --------- | --------------------------- |
| document_id    | INTEGER   | Primary Key                 |
| user_id        | INTEGER   | Foreign Key from Users      |
| file_name      | TEXT      | Name of uploaded file       |
| category_id    | INTEGER   | Foreign Key from Categories |
| upload_date    | DATE      | Date uploaded               |
| extracted_text | TEXT      | OCR extracted text          |

---

### 3. Categories Table

Stores document categories.

| Field Name    | Data Type | Description   |
| ------------- | --------- | ------------- |
| category_id   | INTEGER   | Primary Key   |
| category_name | TEXT      | Category name |

---

### 4. Activity Logs Table

Stores user activities.

| Field Name | Data Type | Description            |
| ---------- | --------- | ---------------------- |
| log_id     | INTEGER   | Primary Key            |
| user_id    | INTEGER   | Foreign Key from Users |
| action     | TEXT      | Activity performed     |
| timestamp  | DATETIME  | Action time            |

---

## Relationship Flow

* One user can upload many documents.
* One document belongs to one category.
* One user can have multiple activity logs.

---

## Entity Relationship Summary

```text
Users (1) ---- (M) Documents
Users (1) ---- (M) Activity Logs
Categories (1) ---- (M) Documents
```

---

## Conclusion

The database relationships ensure structured storage, easy retrieval, and proper management of documents, users, and activities within the IDMS.
