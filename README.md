# Intelligent Document Management System (IDMS)

A full-stack web-based **Intelligent Document Management System** designed to simplify document uploading, organization, searching, retrieval, and activity monitoring. The system combines a React frontend with a Python Flask backend and provides secure authentication, document management, OCR-based text extraction, categorization, search, reports, and dashboard analytics.

---

## Table of Contents

* [Overview](#overview)
* [Problem Statement](#problem-statement)
* [Objectives](#objectives)
* [Key Features](#key-features)
* [System Modules](#system-modules)
* [Technology Stack](#technology-stack)
* [System Architecture](#system-architecture)
* [Project Structure](#project-structure)
* [Authentication](#authentication)
* [OCR Processing](#ocr-processing)
* [Database](#database)
* [API Overview](#api-overview)
* [Installation and Setup](#installation-and-setup)
* [Environment Variables](#environment-variables)
* [Running the Application](#running-the-application)
* [Production Build](#production-build)
* [Deployment](#deployment)
* [Security Considerations](#security-considerations)
* [Future Enhancements](#future-enhancements)
* [Learning Outcomes](#learning-outcomes)
* [Project Status](#project-status)
* [Contributing](#contributing)
* [License](#license)
* [Author](#author)

---

## Overview

Organizations and individuals work with large numbers of digital documents such as PDFs, scanned documents, certificates, images, reports, and other records. Managing these files manually can make searching, organizing, and tracking documents difficult.

The **Intelligent Document Management System (IDMS)** provides a centralized platform where authenticated users can manage their documents through a user-friendly web interface.

The system supports:

* Secure user authentication
* Document uploading
* OCR-based text extraction
* Document searching
* Document categorization
* Document details
* Dashboard statistics
* Activity tracking
* Reports
* Application settings
* Protected routes
* REST API communication
* Database management

---

## Problem Statement

Traditional document management can become inefficient when users have to manually organize and search through large collections of files.

Common challenges include:

* Difficulty locating specific documents
* Manual document categorization
* Limited visibility into document activity
* Managing scanned/image-based documents
* Lack of centralized document access
* Repetitive manual searching
* Difficulty monitoring recent document operations

IDMS addresses these challenges by providing a centralized digital platform with document management, search, OCR, authentication, and activity monitoring capabilities.

---

## Objectives

The main objectives of the project are:

1. Develop a centralized document management platform.
2. Provide secure user authentication and authorization.
3. Allow users to upload supported documents.
4. Extract text from image-based documents using OCR.
5. Enable users to search and retrieve documents efficiently.
6. Organize documents using categories.
7. Track document-related activities.
8. Provide dashboard statistics and recent activities.
9. Provide reports for document management.
10. Develop a modular and maintainable full-stack architecture.
11. Prepare the application for cloud deployment.

---

# Key Features

## 1. User Authentication

The system provides authentication functionality using JWT.

Users can:

* Register an account
* Log in securely
* Receive an authentication token
* Access protected application pages
* Log out of the system

JWT tokens are automatically attached to API requests through an Axios interceptor.

---

## 2. Protected Routes

Application pages are protected so that authenticated users can access the document management features.

The frontend includes a `ProtectedRoute` component that checks the user's authentication state before allowing access.

---

## 3. Document Upload

Users can upload supported documents through the Upload module.

Supported file formats include:

* PDF
* PNG
* JPG
* JPEG
* TIFF
* BMP

The backend validates uploaded files before processing them.

---

## 4. OCR-Based Text Extraction

The system integrates **Tesseract OCR** to extract text from image-based documents.

This allows the application to process scanned documents and images that do not contain directly selectable text.

The OCR functionality is implemented in the backend and can be used as part of document processing.

---

## 5. Document Search

The Search module allows users to find documents from the stored document collection.

The system can use document information and extracted text to assist users in locating relevant documents.

---

## 6. Document Categories

Documents can be organized into categories.

The Categories module provides a structured way to manage document classification and organization.

---

## 7. Document Details

The Document Details module provides information about individual documents.

Document-related information can include:

* Document name
* Document type
* Upload information
* Category
* Extracted information
* Activity information

---

## 8. Dashboard

The dashboard provides an overview of the document management system.

It includes functionality for displaying:

* Document statistics
* Recent uploads
* Recent activities
* System information

The dashboard communicates with backend APIs to retrieve current information.

---

## 9. Activity Tracking

The system records document-related activities.

The activity system allows the application to track operations such as document-related actions and display recent activity to users.

The backend activity API retrieves recent activities in descending order based on creation time.

---

## 10. Reports

The Reports module provides a dedicated interface for viewing document-related information and system statistics.

---

## 11. Settings

The Settings module provides a dedicated area for application/user settings.

---

## 12. Responsive Sidebar Navigation

The application uses a reusable sidebar component for navigation.

The sidebar contains:

* Dashboard
* Upload
* Search
* Categories
* Reports
* Settings
* Logout

The active navigation item is automatically highlighted based on the current route.

---

# System Modules

| Module            | Description                             |
| ----------------- | --------------------------------------- |
| Authentication    | Registration, login, JWT authentication |
| Dashboard         | Statistics and recent activity          |
| Upload            | Upload supported documents              |
| OCR               | Extract text from image-based documents |
| Search            | Search stored documents                 |
| Categories        | Organize documents                      |
| Document Details  | View individual document information    |
| Reports           | Display document/system reports         |
| Settings          | Application settings                    |
| Activity Tracking | Track recent document activities        |

---

# Technology Stack

## Frontend

* React.js
* JavaScript
* React Router
* Axios
* Tailwind CSS
* React Icons
* Vite

## Backend

* Python
* Flask
* Flask-SQLAlchemy
* Flask-CORS
* Flask-JWT-Extended
* Flask-Migrate

## Database

* SQLite for development
* PostgreSQL for production/deployment

## OCR

* Tesseract OCR
* Pytesseract
* Pillow

## Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman
* PowerShell

## Deployment

The application is designed for deployment using cloud hosting platforms such as:

* Netlify for the React frontend
* Render for the Flask backend
* PostgreSQL for the production database

---

# System Architecture

The application follows a client-server architecture.

```text
                    ┌──────────────────────────┐
                    │        User / Client     │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │   React Frontend         │
                    │   Tailwind CSS           │
                    │   React Router           │
                    │   Axios                  │
                    └────────────┬─────────────┘
                                 │
                              REST API
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │      Flask Backend       │
                    │                          │
                    │ Authentication           │
                    │ Document Management      │
                    │ Activity APIs            │
                    │ Search APIs              │
                    │ OCR Processing            │
                    └───────┬─────────┬────────┘
                            │         │
                ┌───────────┘         └────────────┐
                ▼                                  ▼
       ┌──────────────────┐              ┌──────────────────┐
       │    Database      │              │   OCR Engine     │
       │ SQLite/PostgreSQL│              │    Tesseract     │
       └──────────────────┘              └──────────────────┘
```

---

# Project Structure

```text
Intelligent-document-management-system/
│
├── backend/
│   │
│   ├── app/
│   │   ├── models/
│   │   │   ├── activity.py
│   │   │   ├── document.py
│   │   │   └── user.py
│   │   │
│   │   ├── routes/
│   │   │   ├── activity.py
│   │   │   ├── auth.py
│   │   │   ├── dashboard.py
│   │   │   └── document.py
│   │   │
│   │   ├── utils/
│   │   │   ├── jwt_handler.py
│   │   │   └── ocr.py
│   │   │
│   │   ├── config.py
│   │   ├── extensions.py
│   │   └── __init__.py
│   │
│   ├── instance/
│   │   └── idms.db
│   │
│   ├── uploads/
│   │
│   ├── requirements.txt
│   ├── run.py
│   └── .env.example
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── ActivityTimeline.jsx
│   │   │   ├── DashboardCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── RecentUploads.jsx
│   │   │   ├── SearchFilters.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Topbar.jsx
│   │   │   └── UploadArea.jsx
│   │   │
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Categories.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DocumentDetails.jsx
│   │   │   ├── Reports.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Upload.jsx
│   │   │   └── login.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│
├── .gitignore
└── README.md
```

> The exact project structure may change as additional modules and improvements are added.

---

# Authentication

IDMS uses **JSON Web Tokens (JWT)** for authentication.

The general authentication flow is:

```text
User
  │
  ▼
Login
  │
  ▼
Flask Authentication API
  │
  ▼
JWT Token Generated
  │
  ▼
Token Stored by Frontend
  │
  ▼
Axios Interceptor
  │
  ▼
Authorization: Bearer <token>
  │
  ▼
Protected Flask API
```

The frontend automatically attaches the stored JWT token to authenticated requests.

---

# OCR Processing

The OCR module uses:

* Tesseract OCR
* Pytesseract
* Pillow

General workflow:

```text
Document/Image Upload
        │
        ▼
File Validation
        │
        ▼
Image Processing
        │
        ▼
Tesseract OCR
        │
        ▼
Text Extraction
        │
        ▼
Document Information
        │
        ▼
Database / Search
```

For local development, Tesseract OCR must be installed separately on the system.

---

# Database

The project supports different database configurations for development and production.

### Development

SQLite is used for local development.

```text
SQLite
   │
   └── backend/instance/idms.db
```

### Production

PostgreSQL can be configured through the `DATABASE_URL` environment variable.

This allows the application to use a managed PostgreSQL database when deployed to a cloud platform.

---

# API Overview

The Flask backend exposes REST API endpoints for application functionality.

Examples include:

```text
/api/auth/...
/api/dashboard/...
/api/dashboard/activity
/api/activities
/api/documents/...
```

The exact endpoints may vary as the application evolves.

Protected endpoints require a valid JWT authentication token.

---

# Installation and Setup

## Prerequisites

Make sure the following are installed:

* Python 3.x
* Node.js
* npm
* Git
* Tesseract OCR
* Visual Studio Code (recommended)

---

# Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
SECRET_KEY=your-secret-key
DATABASE_URL=your-database-url
```

For local development, the application can use its configured SQLite database when `DATABASE_URL` is not provided.

### Important

Never commit sensitive information such as:

* `.env`
* Database passwords
* JWT secrets
* API keys
* Cloud credentials

These files should remain excluded through `.gitignore`.

---

# Running the Application

## Start Backend

From the `backend` directory:

```bash
python run.py
```

The Flask backend will run locally according to the configuration in the project.

---

## Start Frontend

From the `frontend` directory:

```bash
npm run dev
```

Vite will provide the local frontend URL in the terminal.

Open the displayed URL in a browser.

---

# Production Build

Before deploying the frontend, create a production build:

```bash
cd frontend
npm run build
```

The generated production files are placed inside:

```text
frontend/dist/
```

A successful build should produce output similar to:

```text
dist/index.html
dist/assets/...
```

Large JavaScript bundle warnings from Vite do not necessarily mean that the build failed. They indicate that further code splitting or optimization could improve performance.

---

# Deployment

The application is structured to support separate frontend and backend deployment.

## Frontend

The React/Vite frontend can be deployed to:

**Netlify**

Typical configuration:

```text
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
```

If the hosting platform uses the specified base directory, the publish directory may instead be:

```text
dist
```

---

## Backend

The Flask backend can be deployed to:

**Render**

For a repository containing both frontend and backend, configure the backend service with:

```text
Root Directory:
backend
```

Build command:

```bash
pip install -r requirements.txt
```

Start command:

```bash
gunicorn run:app
```

The production database can be configured using PostgreSQL and the `DATABASE_URL` environment variable.

---

# Frontend API Configuration

The frontend communicates with the backend using Axios.

During local development, the API may point to:

```text
http://127.0.0.1:5000
```

For production deployment, this should be replaced with the deployed backend URL.

Example:

```javascript
const api = axios.create({
    baseURL: "YOUR_DEPLOYED_BACKEND_URL"
});
```

The production URL should be configured appropriately rather than hard-coded to localhost.

---

# Security Considerations

The project includes several security-related measures:

* JWT-based authentication
* Protected frontend routes
* Authorization headers
* Secure password handling through the backend authentication system
* Environment variables for sensitive configuration
* File extension validation
* Upload size restrictions
* Separation of frontend and backend services
* CORS configuration

For a production environment, additional security improvements should be implemented, including stronger secret management, HTTPS enforcement, rate limiting, improved file validation, and secure cloud storage.

---

# Testing and Debugging

The project was tested during development through:

* Local frontend testing
* Local Flask backend testing
* REST API testing
* Browser-based testing
* Authentication flow testing
* Document upload testing
* Dashboard activity testing
* Production frontend build testing
* Git status and repository verification

Postman can also be used for testing backend REST APIs independently.

---

# Git and Version Control

The project uses Git for version control.

Basic commands:

```bash
git status
```

```bash
git add .
```

```bash
git commit -m "Update IDMS application"
```

```bash
git push origin main
```

Generated files such as `node_modules`, build output, virtual environments, uploaded documents, and environment files should not be committed.

---

# Future Enhancements

The following features can be added in future versions:

### AI-Powered Search

Implement semantic search using embeddings and vector databases to allow users to search documents based on meaning rather than only keywords.

### Intelligent Document Classification

Automatically classify uploaded documents using machine learning or deep learning.

### Advanced OCR

Improve OCR accuracy through:

* Image preprocessing
* Noise removal
* Deskewing
* Image enhancement
* Multiple language support

### Document Version Control

Allow users to maintain multiple versions of the same document.

### Role-Based Access Control

Add different roles such as:

* Administrator
* Manager
* Employee
* Viewer

### Cloud Storage

Integrate cloud storage services for scalable document storage.

### Advanced Analytics

Provide visual analytics for:

* Upload trends
* Document categories
* User activities
* Storage usage
* Frequently accessed documents

### Notifications

Add notifications for document uploads, updates, approvals, and other activities.

### Performance Optimization

Implement:

* Lazy loading
* Code splitting
* API caching
* Database indexing
* Background OCR processing

---

# Learning Outcomes

Developing this project provided practical experience in:

* Full-stack web development
* React application development
* Flask backend development
* REST API development
* JWT authentication
* Protected routes
* Database management
* SQLAlchemy ORM
* PostgreSQL
* OCR integration
* File upload handling
* API integration using Axios
* Tailwind CSS
* Git and GitHub
* Debugging
* Cloud deployment concepts
* Software architecture
* Environment configuration

---

# Project Status

**Status: Functional Prototype / Deployment Ready**

The core application modules have been implemented and tested during local development.

Implemented functionality includes:

* [x] User authentication
* [x] JWT authentication
* [x] Protected routes
* [x] Dashboard
* [x] Document upload
* [x] Document management
* [x] OCR integration
* [x] Document search
* [x] Categories
* [x] Document details
* [x] Activity tracking
* [x] Reports
* [x] Settings
* [x] Sidebar navigation
* [x] Active navigation highlighting
* [x] REST API integration
* [x] Database integration
* [x] Git/GitHub integration
* [x] Production frontend build
* [ ] Final cloud deployment
* [ ] Production performance optimization
* [ ] Advanced AI-based semantic search

---

# Contributing

Contributions and suggestions are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/new-feature
```

3. Make your changes.
4. Test the application.
5. Commit your changes.

```bash
git commit -m "Add new feature"
```

6. Push the branch.

```bash
git push origin feature/new-feature
```

7. Create a Pull Request.

---

# License

This project is developed for educational and project demonstration purposes.

---

# Author

## Gopika Sri M

**B.Tech Information Technology**

Intelligent Document Management System

GitHub:

https://github.com/gopikasri715-blip/Intelligent-document-management-system

---

## Acknowledgements

This project was developed as part of an academic/technical project focused on applying full-stack development, document management, OCR, authentication, databases, and cloud deployment concepts to solve a practical document management problem.

---

## Screenshots

Add screenshots of the following modules to make the GitHub repository more professional:

1. Login page
2. Dashboard
3. Upload page
4. Search page
5. Categories page
6. Document Details page
7. Reports page
8. Settings page

Example:

```markdown
## Dashboard

![Dashboard](docs/screenshots/dashboard.png)
```

---

## Quick Start

```bash
# Clone repository
git clone https://github.com/gopikasri715-blip/Intelligent-document-management-system.git

# Enter project
cd Intelligent-document-management-system

# Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python run.py

# Open another terminal

# Frontend
cd frontend
npm install
npm run dev
```

The application can then be accessed through the local frontend URL provided by Vite.
