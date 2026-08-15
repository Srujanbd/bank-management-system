# 🏦 Bank Management System

A backend RESTful API application developed using **Java and Spring Boot** for managing banking operations. The application provides APIs for handling customers, accounts, and banking-related operations with proper validation, exception handling, and HTTP status responses.

---

## 📌 Project Overview

The **Bank Management System** is a backend application designed to simulate basic banking operations through RESTful APIs.

The project follows a structured backend architecture that separates request handling, business logic, and data management. It demonstrates the development of scalable and maintainable REST APIs using Spring Boot.

The APIs can be tested and verified using tools such as **Postman**.

---

## 🚀 Features

### 👤 Customer Management

- Create a new customer
- Retrieve customer details
- Update customer information
- Delete customer information
- Retrieve customer records

### 🏦 Account Management

- Create bank accounts
- Retrieve account details
- Update account information
- Delete accounts
- Manage account-related information

### 💰 Banking Operations

- Perform supported banking operations through REST APIs
- Handle account-related requests
- Validate incoming request data
- Return appropriate HTTP status codes

### 🔐 Validation & Error Handling

- Request validation
- Proper HTTP status responses
- Handling invalid requests
- Handling resources that are not found
- Structured API responses

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Java | Backend programming |
| Spring Boot | Backend application framework |
| Spring MVC | REST API development |
| REST API | Client-server communication |
| Maven | Dependency management and build automation |
| SQL | Database management |
| Postman | API testing |
| Git | Version control |
| GitHub | Source code management |

---

## 🏗️ Project Architecture

The project follows a layered backend architecture:

```text
Client
  │
  │ HTTP Request
  ▼
Controller Layer
  │
  │
  ▼
Service Layer
  │
  │
  ▼
Repository / Data Layer
  │
  ▼
Database
