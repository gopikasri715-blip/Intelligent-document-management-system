# Technical Architecture

## 1. Frontend Layer

The frontend is built using React.js and Tailwind CSS. It provides the user interface for login, upload, search, and document viewing.

## 2. Backend Layer

The backend uses Python with Flask framework. It handles business logic, API requests, OCR processing, and database communication.

## 3. Database Layer

SQLite is used for storing:

* User details
* Document metadata
* OCR extracted text
* Categories

## 4. OCR Layer

Tesseract OCR is used for text extraction from uploaded documents.

## 5. Storage Layer

Uploaded documents are stored securely in a local uploads folder.

## 6. System Flow

User → Frontend → Backend → OCR Processing → Database Storage → Search/Retrieval

## 7. Benefits

* Modular structure
* Easy maintenance
* Fast retrieval
* Secure document handling
