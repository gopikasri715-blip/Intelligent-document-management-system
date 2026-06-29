# Intelligent Document Management System

## API Design

### Authentication APIs

| Method | Endpoint  | Description       |
| ------ | --------- | ----------------- |
| POST   | /register | Register new user |
| POST   | /login    | User login        |
| POST   | /logout   | Logout user       |

---

### Document APIs

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| POST   | /upload        | Upload document      |
| GET    | /documents     | View all documents   |
| GET    | /document/{id} | View single document |
| DELETE | /document/{id} | Delete document      |

---

### OCR APIs

| Method | Endpoint      | Description                     |
| ------ | ------------- | ------------------------------- |
| POST   | /extract-text | Extract text from uploaded file |

---

### Search APIs

| Method | Endpoint              | Description      |
| ------ | --------------------- | ---------------- |
| GET    | /search?query=keyword | Search documents |

---

### Category APIs

| Method | Endpoint    | Description                        |
| ------ | ----------- | ---------------------------------- |
| GET    | /categories | View all categories                |
| POST   | /categorize | Automatically categorize documents |

---

### User APIs

| Method | Endpoint | Description         |
| ------ | -------- | ------------------- |
| GET    | /profile | View user profile   |
| PUT    | /profile | Update user profile |

---

### Future APIs

| Method | Endpoint        | Description                     |
| ------ | --------------- | ------------------------------- |
| GET    | /activity-logs  | View user activity logs         |
| GET    | /analytics      | View system analytics           |
| POST   | /share-document | Share document with other users |

---

## Conclusion

The API design defines the communication between frontend and backend modules in the IDMS. It helps in structuring authentication, document processing, OCR extraction, search operations, and user management efficiently.
