📚 Library Management System – REST API
This is a Library Management System Web Application built with a focus on role-based access control. It allows users to browse, review, and request books, while administrators manage all data and user activities through protected API endpoints.

🚀 Getting Started
Follow these steps to set up and run the project on your local machine:

🧰 Prerequisites
Docker is installed and running
Node.js installed (v16+ recommended)
Git installed
A code editor like VS Code
🛠️ Installation
Clone the repository

git clone https://github.com/your-username/library-management-system.git
cd library-management-system
Install dependencies

npm install
⚙️ Environment Variables Create a .env file in the root directory and add the following:

PORT=4000
DB_CONNECTION_URL=mongodb://<username>:<password>@localhost:27017/?authSource=admin
DB_USERNAME=SHAHADAT
DB_PASSWORD=SHAHADATpass2456
DB_NAME=library_management_system
ACCESS_TOKEN_SECRET=b9c89e83b0b37973a1bfldjfldfj4rfdjflksj1d748f10a61ffdb6a5e984b92e86cfa3c0d8f
Start Docker

Ensure Docker Desktop is running
Start services with Docker Compose

 docker-compose up -d
Run the development server

 npm run dev
🧪 Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (via Docker)
Authentication: JWT
Containerization: Docker & Docker Compose
📜 Scripts
docker-compose up -d – Start MongoDB and other services via Docker
npm run dev – Run the app in development mode
npm start – Start the server in production mode
docker-compose down – Stop and remove containers
🔍 Overview
Public users can view the list of books.
Authenticated users can request (issue) books, write, update, and delete their reviews.
Admins can manage books (create, update, delete), manage users and their roles, handle book issues, Moderate all reviews.
✅ Features
Authentication & User Management
User registration and secure login
Role-based access: User vs Admin
Admin privileges: Create, update, and delete users. Reset user passwords.
📚 Book Management
Book details include: name, author, image, and summary
Publicly accessible book list
Admin controls: Add, update, and delete books
✍️ Review System
Authenticated users can create, update, and delete their reviews.
View all reviews
Admins can manage all reviews
📦 Book Issue Management
Authenticated users can request books and cancel book requests.
Admin capabilities: Update and delete book issues
🛡️ Security
Passwords are hashed and salted
JWT authentication
Secure endpoints for protected routes
⚙️ Non-Functional Requirements
Performance: Handles concurrent requests with optimised response times
Scalability: Supports horizontal scaling
Reliability: Robust error handling and logging
