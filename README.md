🏦 Bank Management System

A full-stack Bank Management System built with Spring Boot,
React.js, and PostgreSQL, with Docker-based containerization and
an automated GitHub Actions CI/CD pipeline.

The application provides an admin dashboard for managing banks, customer
accounts, addresses, and banking transactions through RESTful APIs.

📌 Overview

The project follows a client-server architecture:

React.js provides the responsive admin dashboard.

Spring Boot exposes REST APIs and handles business logic.

Spring Data JPA / Hibernate manages database persistence.

PostgreSQL stores application data.

Docker Compose runs the application and database as separate
containers.

GitHub Actions automates the build and Docker image publishing
process.

GitHub Container Registry (GHCR) stores the published Docker
image.

✨ Features

🔐 Admin & Authentication

Admin login interface

Protected frontend routes

Admin profile

Admin settings

Logout functionality

Frontend authentication state using LocalStorage

The current project implements authentication on the frontend.
Production-grade backend authentication and authorization can be added
with Spring Security and JWT/session-based authentication.

🏦 Bank Management

Add new bank

View all banks

View bank details

Update bank details

Delete bank

Search/view bank information

Bank address management

IFSC code management

👤 Account Management

Create bank accounts

View all accounts

View account details

Search by account number

View accounts by bank

Filter accounts by account type

Find accounts based on balance

Sort accounts

Delete accounts

💰 Banking Transactions

Deposit money

Withdraw money

Transfer money between accounts

Automatic account balance updates

Transaction validation

Success and error feedback

📍 Address Management

Create addresses

View address details

Update addresses

Delete addresses

Associate addresses with banks

🔔 Notification System

The frontend provides a dynamic notification system for important
operations.

Notification counter

Read/unread notifications

Mark all as read

Clear all notifications

Notification timestamps

LocalStorage persistence

Notifications for bank, account, address, deposit, withdrawal, and
transfer operations

📱 Responsive UI

Desktop dashboard

Responsive tables and cards

Mobile-friendly sidebar

Mobile navigation

Responsive forms

🎨 User Experience

Toast notifications

Confirmation modals

Loading states

Error handling

Reusable React components

Clean admin dashboard

🛠️ Technology Stack

Backend

Technology           Purpose

Java                 Programming language
Spring Boot          Backend framework
Spring MVC           REST API development
Spring Data JPA      Data access
Hibernate            ORM
Jakarta Validation   Request validation
Maven                Build and dependency management
PostgreSQL           Relational database

Frontend

Technology     Purpose

React.js       UI development
Vite           Frontend build tool
JavaScript     Application logic
HTML5          Structure
CSS3           Styling
Axios          REST API communication
React Router   Client-side routing
LocalStorage   Frontend state/session and notification persistence

DevOps & Tools

Technology                  Purpose

Git                         Version control
GitHub                      Source code hosting
Docker                      Containerization
Docker Compose              Multi-container deployment
GitHub Actions              CI/CD automation
GitHub Container Registry   Docker image registry
Postman                     API testing
Eclipse / IntelliJ IDEA     Backend development
VS Code                     Frontend development
Docker Desktop              Local container runtime

🏗️ System Architecture

                    ┌──────────────────────┐
                    │      React.js        │
                    │      Frontend        │
                    │                      │
                    │ Dashboard            │
                    │ Banks                │
                    │ Accounts             │
                    │ Transactions         │
                    │ Addresses            │
                    │ Admin                │
                    └──────────┬───────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Spring Boot      │
                    │       Backend        │
                    │                      │
                    │ Controllers          │
                    │ Services             │
                    │ Repositories         │
                    │ Entities             │
                    │ DTOs                 │
                    │ Validation            │
                    └──────────┬───────────┘
                               │
                         JPA / Hibernate
                               │
                               ▼
                    ┌──────────────────────┐
                    │      PostgreSQL      │
                    │       Database       │
                    └──────────────────────┘

📂 Project Structure

bank-management-system/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── Bank-Management-App/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── jsp/
│   │       │       ├── config/
│   │       │       ├── controller/
│   │       │       ├── dto/
│   │       │       ├── entity/
│   │       │       ├── enums/
│   │       │       ├── exception/
│   │       │       ├── repository/
│   │       │       ├── service/
│   │       │       └── BankManagementAppApplication.java
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   ├── pom.xml
│   ├── mvnw
│   ├── Dockerfile
│   └── docker-compose.yml
│
└── README.md

🔄 CI/CD Pipeline

The project uses GitHub Actions to automate the build and Docker
image publishing process.

Every push to the main branch triggers the workflow.

Developer
    │
    │ git push
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ├── Checkout source code
    │
    ├── Set up Java 25
    │
    ├── Maven Build
    │
    ├── Login to GHCR
    │
    ├── Build Docker Image
    │
    └── Push Docker Image
             │
             ▼
     GitHub Container Registry
             │
             ▼
   ghcr.io/srujanbd/bank-management-app

CI/CD Workflow Steps

Checkout the repository.

Configure Java 25 using Temurin.

Build the Spring Boot application with Maven.

Authenticate with GitHub Container Registry.

Build the Docker image.

Push the image to GHCR.

The workflow is located at:

.github/workflows/ci.yml

🐳 Docker Architecture

The application is deployed using two containers:

┌─────────────────────────────────────────────┐
│              Docker Compose                 │
│                                             │
│   ┌─────────────────┐                       │
│   │    bank-app     │                       │
│   │  Spring Boot    │                       │
│   │    Port 8080    │                       │
│   └────────┬────────┘                       │
│            │                                │
│            │ Docker Network                 │
│            │                                │
│   ┌────────▼────────┐                       │
│   │     bank-db     │                       │
│   │   PostgreSQL    │                       │
│   │    Port 5432    │                       │
│   └─────────────────┘                       │
│                                             │
│        PostgreSQL Docker Volume             │
└─────────────────────────────────────────────┘

Containers

Container               Image                                           Purpose

bank-app              ghcr.io/srujanbd/bank-management-app:latest   Spring Boot application

bank-db               postgres:16                                   PostgreSQL database

The database uses a Docker volume so data can persist when containers
are recreated.

📦 Docker Image

The application Docker image is published to GitHub Container Registry:

ghcr.io/srujanbd/bank-management-app:latest

The deployment Compose configuration pulls this image instead of
building the application locally.

To pull the image manually:

docker pull ghcr.io/srujanbd/bank-management-app:latest

⚙️ Environment Configuration

The Spring Boot application uses environment variables for database
configuration:

spring.datasource.url=jdbc:postgresql://${DB_HOST:db}:5432/${DB_NAME:bank_management}
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:root}

Supported variables:

Variable        Default             Purpose

DB_HOST       db                PostgreSQL service hostname
DB_NAME       bank_management   Database name
DB_USERNAME   postgres          Database username
DB_PASSWORD   root              Database password

For production deployments, credentials should be stored using a
secure secrets-management solution rather than committed defaults.

🚀 Running with Docker

Prerequisites

Docker Desktop

Git

Clone the Repository

git clone https://github.com/Srujanbd/bank-management-system.git
cd bank-management-system/Bank-Management-App

Pull the Published Image

docker compose pull

Start the Application

docker compose up -d

Check Containers

docker compose ps

Expected services:

bank-app   Up
bank-db    Up (healthy)

Access the Application

http://localhost:8080

View Application Logs

docker compose logs -f app

Stop the Application

docker compose down

Do not use docker compose down -v unless you intentionally want to
remove the PostgreSQL volume and its stored data.

💻 Local Development Without Docker

Backend

Navigate to the Spring Boot project:

cd Bank-Management-App

Configure PostgreSQL in:

src/main/resources/application.properties

Then run:

./mvnw spring-boot:run

On Windows PowerShell:

.\mvnw spring-boot:run

The backend normally runs at:

http://localhost:8080

Frontend

If the React frontend is included in your local project structure,
navigate to its directory:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The development frontend normally runs at:

http://localhost:5173

🔌 REST API

🏦 Bank APIs

Method   Endpoint        Description

GET      /banks        Get all banks
GET      /banks/{id}   Get bank by ID
POST     /banks        Create bank
PUT      /banks/{id}   Update bank
DELETE   /banks/{id}   Delete bank

👤 Account APIs

Method                  Endpoint                                         Description

GET                     /accounts                                      Get all accounts

GET                     /accounts/{id}                                 Get account by ID

GET                     /accounts/number/{number}                      Find account by account
number

GET                     /accounts/bank/{bankId}                        Get accounts by bank

GET                     /accounts/type/{type}                          Filter by account type

GET                     /accounts/balance/greater/{amount}             Find accounts above
balance

GET                     /accounts/sort?field=accountId&direction=asc   Sort accounts

POST                    /accounts/bank/{bankId}                        Create account

DELETE                  /accounts/{id}                                 Delete account

💳 Transaction APIs

Deposit

PATCH /accounts/deposit

Example:

{
  "accountNumber": "ACC100001",
  "amount": 5000
}

Withdrawal

PATCH /accounts/withdraw

Example:

{
  "accountNumber": "ACC100001",
  "amount": 1000
}

Transfer

PATCH /accounts/transfer

Example:

{
  "senderAccount": "ACC100001",
  "receiverAccount": "ACC100002",
  "amount": 2000
}

📍 Address APIs

The application provides REST APIs for creating, reading, updating, and
deleting address information associated with banks and other entities.

Refer to:

src/main/java/jsp/controller/

for the complete endpoint definitions.

🧪 API Testing

Backend APIs can be tested using Postman.

Example:

GET http://localhost:8080/banks

The APIs can be used to test:

Bank CRUD

Account CRUD

Account search

Account filtering

Account sorting

Deposit

Withdrawal

Transfer

Address operations

🔐 Frontend Route Protection

Protected routes prevent unauthenticated users from directly accessing
admin pages.

Public route:

/login

Protected pages include:

/banks
/accounts
/transactions
/addresses
/settings
/admin/profile

The current authentication state is maintained using LocalStorage.

🖥️ Main Frontend Pages

Page              Description

Login             Admin login
Dashboard         Banking system overview
Banks             Manage banks
Add Bank          Create a bank
Bank Details      View bank information
Edit Bank         Update bank information
Accounts          Manage customer accounts
Add Account       Create an account
Account Details   View account information
Transactions      Deposit, withdraw and transfer
Addresses         Manage addresses
Admin Profile     View admin information
Settings          Application settings

📸 Screenshots

Add project screenshots here to demonstrate the working application.

Recommended screenshots:

Login

Dashboard

Banks

Bank Details

Accounts

Transactions

Notifications

Admin Profile

Settings

Mobile responsive view

GitHub Actions successful workflow

GHCR package

Docker containers

Example:

![Dashboard](screenshots/dashboard.png)

🧠 Key Learning Outcomes

Through this project, I gained practical experience with:

REST API development

Spring Boot

Spring MVC

Spring Data JPA

Hibernate

PostgreSQL

Entity relationships

DTOs

Request validation

CRUD operations

React.js

React Router

Axios

React Context API

LocalStorage

Responsive UI development

CORS configuration

Git and GitHub

Docker

Docker Compose

GitHub Actions

GitHub Container Registry

CI/CD fundamentals

Containerized application deployment

Environment-based configuration

🛠️ Problems Solved During Deployment

Database persistence

The PostgreSQL database is backed by a Docker volume so application
containers can be recreated without unnecessarily deleting database
data.

Container networking

The Spring Boot container connects to PostgreSQL using the Docker
Compose service name:

db

instead of using localhost.

Windows and Linux Maven wrapper compatibility

The Maven wrapper executable permission was configured in Git so GitHub
Actions running on Ubuntu can execute:

./mvnw

Automated Docker publishing

GitHub Actions authenticates to GHCR using the GitHub-provided token and
publishes the application image automatically after successful builds.

🔮 Future Enhancements

Possible improvements include:

Spring Security

JWT-based authentication

Role-based authorization

Persistent transaction history

Pagination

Advanced search

Dashboard analytics

Charts and reports

Export transaction reports

Email notifications

Password reset

Audit logging

Cloud deployment

HTTPS

Monitoring and observability

Production secrets management

👨‍💻 Author

Srujan B D

B.E. Computer Science & Engineering

Interests

Java Development

Spring Boot

Full-Stack Development

Backend Development

React.js

SQL

Docker

CI/CD

DevOps

📄 License

This project is developed for educational and portfolio purposes.
