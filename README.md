# 🏦 Bank Management System

A full-stack Bank Management System built using **Spring Boot** and **React.js**.  
The application provides a modern admin dashboard for managing banks, customer accounts, addresses, and banking transactions through RESTful APIs.

---

## 📌 Project Overview

The Bank Management System is designed to simplify common banking management operations through a centralized web application.

The backend is developed using **Java Spring Boot** and exposes REST APIs for managing banks, accounts, addresses, and transactions.

The frontend is developed using **React.js** and provides a responsive admin dashboard with CRUD operations, transaction management, notifications, authentication flow, and mobile-friendly navigation.

---

## ✨ Features

### 🔐 Admin & Authentication

- Admin login interface
- Protected routes
- Admin profile
- Admin settings
- Logout functionality
- Frontend authentication state using LocalStorage

### 🏦 Bank Management

- Add new bank
- View all banks
- View bank details
- Update bank details
- Delete bank
- Search/view bank information
- Bank address management
- IFSC code management

### 👤 Account Management

- Create bank account
- View all accounts
- View account details
- Search account by account number
- View accounts by bank
- Filter accounts by account type
- Find accounts based on balance
- Sort accounts
- Delete accounts

### 💰 Banking Transactions

- Deposit money
- Withdraw money
- Transfer money between accounts
- Account balance updates
- Transaction validation
- Success and error feedback

### 📍 Address Management

- Create/manage addresses
- View address details
- Update address
- Delete address
- Address information linked with banks

### 🔔 Notification System

The frontend includes a dynamic notification system.

Notifications are generated for important operations such as:

- Bank creation
- Bank update
- Bank deletion
- Account creation
- Account deletion
- Deposit
- Withdrawal
- Money transfer
- Address update

Features include:

- Notification counter
- Read/unread notifications
- Mark all as read
- Clear all notifications
- Notifications stored using LocalStorage
- Notification timestamps

### 📱 Responsive UI

- Desktop dashboard
- Mobile-friendly sidebar
- Responsive tables/cards
- Mobile navigation
- Responsive forms
- Admin dashboard layout

### 🎨 User Experience

- Toast notifications
- Confirmation modal for destructive actions
- Loading states
- Error handling
- Clean dashboard UI
- Reusable React components

---

# 🛠️ Technology Stack

## Backend

| Technology | Purpose |
|---|---|
| Java | Programming language |
| Spring Boot | Backend framework |
| Spring MVC | REST API development |
| Spring Data JPA | Database interaction |
| Hibernate | ORM |
| Jakarta Validation | Request validation |
| Maven | Dependency management |
| MySQL | Database |

## Frontend

| Technology | Purpose |
|---|---|
| React.js | UI development |
| Vite | Frontend build tool |
| JavaScript | Application logic |
| HTML5 | Structure |
| CSS3 | Styling |
| Axios | REST API communication |
| React Router | Client-side routing |
| LocalStorage | Frontend session/notification persistence |

## Development Tools

- Git
- GitHub
- VS Code
- Eclipse / IntelliJ IDEA
- Postman
- MySQL Workbench
- Chrome / Edge Developer Tools

---

# 🏗️ Project Architecture

The project follows a client-server architecture.

```text
                    ┌──────────────────────┐
                    │      React.js        │
                    │      Frontend        │
                    │                      │
                    │  Dashboard           │
                    │  Banks               │
                    │  Accounts            │
                    │  Transactions        │
                    │  Addresses           │
                    │  Admin               │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST API
                               │ Axios
                               ▼
                    ┌──────────────────────┐
                    │     Spring Boot      │
                    │       Backend        │
                    │                      │
                    │ Controllers           │
                    │ Services              │
                    │ Repositories          │
                    │ Entities              │
                    │ DTOs                  │
                    └──────────┬───────────┘
                               │
                               │ JPA / Hibernate
                               ▼
                    ┌──────────────────────┐
                    │        MySQL         │
                    │       Database       │
                    └──────────────────────┘bank-management-system/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── jsp/
│       │       ├── config/
│       │       ├── controller/
│       │       ├── dto/
│       │       ├── entity/
│       │       ├── enums/
│       │       ├── exception/
│       │       ├── repository/
│       │       ├── service/
│       │       └── BankManagementAppApplication.java
│       │
│       └── resources/
│           └── application.properties
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── ConfirmModal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Toast.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── NotificationContext.jsx
│   │   │   └── ToastContext.jsx
│   │   │
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AccountDetails.jsx
│   │   │   ├── Accounts.jsx
│   │   │   ├── AddAccount.jsx
│   │   │   ├── AddBank.jsx
│   │   │   ├── AddressDetails.jsx
│   │   │   ├── Addresses.jsx
│   │   │   ├── AdminProfile.jsx
│   │   │   ├── BankDetails.jsx
│   │   │   ├── Banks.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditAddress.jsx
│   │   │   ├── EditBank.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── Transactions.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── accountService.js
│   │   │   ├── addressService.js
│   │   │   ├── api.js
│   │   │   └── bankService.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── pom.xml
├── .gitignore
└── README.md
Backend API Endpoints
🏦 Bank APIs
Get all banks
GET /banks
Get bank by ID
GET /banks/{id}
Create bank
POST /banks
Update bank
PUT /banks/{id}
Delete bank
DELETE /banks/{id}
👤 Account APIs
Get all accounts
GET /accounts
Get account by ID
GET /accounts/{id}
Get account by account number
GET /accounts/number/{number}
Get accounts by bank
GET /accounts/bank/{bankId}
Get accounts by type
GET /accounts/type/{type}
Get accounts with balance greater than amount
GET /accounts/balance/greater/{amount}
Sort accounts
GET /accounts/sort?field=accountId&direction=asc
Create account
POST /accounts/bank/{bankId}
Delete account
DELETE /accounts/{id}
💳 Transaction APIs
Deposit
PATCH /accounts/deposit

Example request:

{
  "accountNumber": "ACC100001",
  "amount": 5000
}
Withdraw
PATCH /accounts/withdraw

Example request:

{
  "accountNumber": "ACC100001",
  "amount": 1000
}
Transfer
PATCH /accounts/transfer

Example request:

{
  "senderAccount": "ACC100001",
  "receiverAccount": "ACC100002",
  "amount": 2000
}
📍 Address APIs

The application also provides REST APIs for managing address information associated with banks and other entities.

Typical operations include:

GET
POST
PUT
DELETE

Refer to the controller classes in:

src/main/java/jsp/controller/

for the complete endpoint definitions.

⚙️ Backend Setup
1. Clone the repository
git clone https://github.com/Srujanbd/bank-management-system.git

Move into the project:

cd bank-management-system
2. Configure MySQL

Create a database in MySQL:

CREATE DATABASE bank_management;

Update your Spring Boot configuration in:

src/main/resources/application.properties

Example:

spring.datasource.url=jdbc:mysql://localhost:3306/bank_management
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD


spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

Replace YOUR_PASSWORD with your local MySQL password.

3. Run the Spring Boot application

Using Maven:

mvn spring-boot:run

Or run:

BankManagementAppApplication.java

from your IDE.

The backend will normally run at:

http://localhost:8080
⚛️ Frontend Setup

Open another terminal.

Move into the frontend:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend will normally run at:

http://localhost:5173
🔄 Running the Full Application

You need both applications running.

Terminal 1 — Backend
mvn spring-boot:run

Backend:

http://localhost:8080
Terminal 2 — Frontend
cd frontend
npm install
npm run dev

Frontend:

http://localhost:5173

The React frontend communicates with the Spring Boot backend through REST APIs.

🌐 CORS Configuration

The frontend and backend run on different ports during development:

Frontend → http://localhost:5173
Backend  → http://localhost:8080

CORS configuration is provided in:

src/main/java/jsp/config/CorsConfig.java

This allows the React application to communicate with the Spring Boot APIs during local development.

🧪 API Testing

Backend APIs can be tested independently using Postman.

Example:

GET http://localhost:8080/banks

Example successful response:

{
  "statusCode": 200,
  "message": "Banks fetched successfully",
  "data": []
}

You can test:

Bank CRUD
Account CRUD
Account search
Account filtering
Account sorting
Deposit
Withdrawal
Transfer
Address operations
🖥️ Frontend Pages

The application includes the following main pages:

Page	Description
Dashboard	Overview of the banking system
Banks	Manage banks
Add Bank	Create a new bank
Bank Details	View individual bank
Edit Bank	Update bank information
Accounts	Manage customer accounts
Add Account	Create new account
Account Details	View account information
Transactions	Deposit, withdraw and transfer
Addresses	Manage addresses
Admin Profile	View admin information
Settings	Application settings
Login	Admin login
🔔 Notification System

The frontend uses a React Context-based notification system.

Notifications are stored in browser LocalStorage.

Example:

💰 Deposit Successful
₹5,000 deposited into ACC100001


💸 Withdrawal Successful
₹1,000 withdrawn from ACC100001


🔄 Transfer Successful
₹2,000 transferred from ACC100001 to ACC100002


🏦 Bank Created
HDFC Bank was created successfully

The system supports:

Unread notification count
Read/unread state
Mark all as read
Clear all notifications
Notification persistence after page refresh
🔐 Frontend Route Protection

Protected routes prevent unauthenticated users from directly accessing admin pages.

Example:

/login

is publicly accessible.

Admin pages such as:

/
/banks
/accounts
/transactions
/addresses
/settings
/admin/profile

are protected through:

ProtectedRoute.jsx

The current authentication flow is implemented on the frontend using LocalStorage.

This is a frontend authentication flow for the current project version. Production applications should use secure server-side authentication and authorization such as Spring Security with JWT/session-based authentication.

📱 Responsive Design

The frontend is designed to work across:

Desktop
Laptop
Tablet
Mobile

The sidebar automatically adapts to smaller screens and provides mobile navigation.

🏆 Key Learning Outcomes

Through this project, I worked with:

REST API development
Spring Boot
Spring MVC
Spring Data JPA
Hibernate
MySQL
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
API testing using Postman
🚀 Future Enhancements

Possible future improvements include:

Spring Security authentication
JWT-based authentication
Role-based authorization
Backend notification persistence
Transaction history
Pagination
Advanced search
Dashboard analytics
Charts and reports
Export transaction reports
Email notifications
Password reset
Audit logs
Deployment using Docker
Cloud deployment
📸 Screenshots

Add screenshots of the application here.

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
Mobile View

Example:

## Dashboard


![Dashboard](screenshots/dashboard.png)
👨‍💻 Author

Srujan B D

B.E. Computer Science & Engineering

Interested in:

Java Development
Full Stack Development
Spring Boot
React.js
SQL
Backend Development
📄 License

This project is developed for educational and portfolio purposes.



### One important correction before you paste it


I intentionally described your current login as **frontend authentication**, not as full Spring Security/JWT authentication. That's important for your portfolio because you don't want the README to claim a backend security feature that isn't actually implemented.


Also, your actual project has **Spring Boot + React + MySQL**, so this README presents it as a proper full-stack project rather than just the backend.


Save this as:


```text
Bank-Management-App/README.md

Then run:

git add README.md
git commit -m "Update project README"
git push

If git push says the upstream is not set, use:

git push -u origin main
