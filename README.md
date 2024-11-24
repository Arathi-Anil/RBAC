# RBAC Dashboard

A **Role-Based Access Control (RBAC) Dashboard** built with React to manage users, roles, and permissions. This system provides a secure, user-friendly interface for administrators to handle access controls efficiently.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Structure](#database-structure)

---

## Project Overview

The RBAC Dashboard provides a framework for managing users, roles, and permissions in an application. This project leverages **React** for the frontend and **json-server** to simulate a backend.

Key capabilities include:
- Assigning roles to users.
- Managing role-based permissions.
- Secure and granular control over user access.

---

## Features

- **User Management**: Add, edit, delete, and assign roles to users.
- **Role Management**: Create, update, and delete roles with associated permissions.
- **Permission Assignment**: Assign or modify permissions for specific roles.
- **Error Handling**: Graceful fallback with a `NotFound` page for undefined routes.
- **Simulated Backend**: Uses `json-server` for data simulation.

---

## Project Structure
```
rbac-dashboard/
├── node_modules/           # Dependencies
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # Reusable components
│   │   ├── Navbar.js       # Navigation bar component
│   │   ├── Permissions.js  # Permissions handling component
│   ├── pages/              # Pages for the application
│   │   ├── HomePage.js     # Main landing page
│   │   ├── NotFound.js     # 404 error page
│   │   ├── RoleManagement.js  # Role management page
│   │   ├── UserManagement.js  # User management page
│   ├── services/           # API services
│   │   └── api.js          # API requests and configurations
│   ├── App.js              # Main React component
│   ├── index.js            # Entry point for the React app
│   ├── App.css             # Global CSS styles
├── db.json                 # Mock database for json-server
├── package.json            # Project configuration and dependencies
├── package-lock.json       # Detailed dependency tree
├── README.md               # Project documentation
├── .gitignore              # Files and directories to ignore in Git
```


---

## Technologies Used

- **Frontend**: React, CSS
- **Backend Simulation**: json-server
- **API Requests**: Axios
- **Package Manager**: npm

---

## Setup Instructions

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js installed on your machine.
- npm (Node Package Manager) installed.

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/rbac-dashboard.git
   cd rbac-dashboard


## Setup Instructions

### Install Dependencies
Run the following command to install all required dependencies:
```
npm install
```

### Start the JSON Server
Run the following command to start the mock API server:
```
npm run server
```
The mock API will run at [http://localhost:5000](http://localhost:5000).

### Start the Development Server
Run the following command to start the React development server:
```
npm start
```
The React app will be available at [http://localhost:3000](http://localhost:3000).

---

## Usage

### User Management
- Navigate to the **User Management** page to add, edit, or delete users.
- Assign roles to users from the available options.

### Role Management
- Use the **Role Management** page to add, edit, or delete roles.
- Dynamically assign permissions to roles.

---

## API Endpoints

The API services are defined in `services/api.js`. Below are the available endpoints:

### Users
- **Get Users**: `GET /users`
- **Add User**: `POST /users`
- **Update User**: `PUT /users/:id`
- **Delete User**: `DELETE /users/:id`
- **Assign Role to User**: `PATCH /users/:id`

### Roles
- **Get Roles**: `GET /roles`
- **Add Role**: `POST /roles`
- **Update Role**: `PUT /roles/:id`
- **Delete Role**: `DELETE /roles/:id`
- **Assign Permissions to Role**: `PATCH /roles/:id`

---

## Database Structure

The mock database (`db.json`) includes `users` and `roles` collections.

### Users
Example structure:
```json
{
  "id": "2",
  "name": "Jane Smith",
  "role": "Admin",
  "status": "Inactive"
}
```

### Roles
Example structure:
```json
{
  "id": "1",
  "name": "Admin",
  "permissions": ["Read", "Write", "Delete"]
}
```
```