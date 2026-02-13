# Backend API Documentation

## Base URL
- Development: `http://localhost:5000/api`
- Production: Update according to your deployment

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### 1. Login (Admin/Student)
**POST** `/api/auth/login`

Login for both admin and student users.

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)",
  "batchId": "string (required for students)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "email": "user@university.ac.in",
      "name": "User Name",
      "role": "admin|student",
      "batchId": "ISE2024",
      "batch": "2020-2024",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### 2. Initialize Admin
**POST** `/api/auth/init-admin`

Create the initial admin user (one-time setup).

**Request Body:** None (uses environment variables)

**Response:**
```json
{
  "success": true,
  "message": "Admin user created successfully",
  "data": {
    "user": { /* admin user object */ }
  }
}
```

### 3. Get User Profile
**GET** `/api/auth/profile`

Get current logged-in user's profile.

**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { /* user object */ }
  }
}
```

### 4. Register Student (Admin Only)
**POST** `/api/auth/register-student`

Register a new student user.

**Headers:** Authorization required (Admin only)

**Request Body:**
```json
{
  "email": "student@university.ac.in",
  "password": "password123",
  "name": "Student Name",
  "batchId": "ISE2024",
  "batch": "2020-2024"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "user": { /* student user object */ }
  }
}
```

### 5. Create Batch (Admin Only)
**POST** `/api/auth/create-batch`

Create a new batch for students.

**Headers:** Authorization required (Admin only)

**Request Body:**
```json
{
  "batchId": "ISE2024",
  "batch": "2020-2024",
  "department": "Information Science and Engineering",
  "year": 2024,
  "totalStudents": 60,
  "description": "Batch description"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Batch created successfully",
  "data": {
    "batch": { /* batch object */ }
  }
}
```

### 6. Get All Batches (Admin Only)
**GET** `/api/auth/batches`

Get list of all batches.

**Headers:** Authorization required (Admin only)

**Response:**
```json
{
  "success": true,
  "data": {
    "batches": [ /* array of batch objects */ ]
  }
}
```

---

## Project Endpoints

### 1. Get All Projects
**GET** `/api/projects`

Get all projects with filtering and pagination.

**Headers:** Authorization required

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category (undergraduate|capstone|research|internship)
- `year` - Filter by year
- `search` - Search query (searches in title and description)
- `approved` - Filter by approval status (true|false, admin only)

**Response:**
```json
{
  "success": true,
  "data": {
    "projects": [ /* array of project objects */ ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalProjects": 50,
      "hasNext": true,
      "hasPrev": false,
      "limit": 10
    }
  }
}
```

### 2. Get Project by ID
**GET** `/api/projects/:id`

Get a single project by ID.

**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "data": {
    "project": { /* detailed project object */ }
  }
}
```

### 3. Create Project (Student Only)
**POST** `/api/projects`

Create a new project.

**Headers:** Authorization required (Student only)

**Request Body:**
```json
{
  "title": "Project Title",
  "description": "Detailed project description...",
  "shortDescription": "Brief description",
  "year": 2024,
  "category": "undergraduate",
  "tags": ["React", "Node.js", "MongoDB"],
  "teamMembers": [
    {
      "name": "Member Name",
      "email": "member@university.ac.in",
      "linkedIn": "https://linkedin.com/in/member",
      "github": "https://github.com/member",
      "role": "Full-Stack Developer"
    }
  ],
  "supervisor": {
    "name": "Dr. Supervisor Name",
    "email": "supervisor@university.ac.in",
    "department": "Information Science and Engineering",
    "title": "Associate Professor"
  },
  "demoUrl": "https://demo.example.com",
  "repoUrl": "https://github.com/user/project"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project created successfully and pending approval",
  "data": {
    "project": { /* project object */ }
  }
}
```

### 4. Update Project (Student Only)
**PUT** `/api/projects/:id`

Update an existing project (only if not approved).

**Headers:** Authorization required (Student only, creator)

**Request Body:** Same as create, partial updates allowed

**Response:**
```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": {
    "project": { /* updated project object */ }
  }
}
```

### 5. Approve/Reject Project (Admin Only)
**POST** `/api/projects/:id/approve`

Approve or reject a project.

**Headers:** Authorization required (Admin only)

**Request Body:**
```json
{
  "approve": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project approved successfully",
  "data": {
    "project": { /* updated project object */ }
  }
}
```

### 6. Delete Project (Admin Only)
**DELETE** `/api/projects/:id`

Delete a project.

**Headers:** Authorization required (Admin only)

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

### 7. Get Project Statistics (Admin Only)
**GET** `/api/projects/admin/stats`

Get project statistics.

**Headers:** Authorization required (Admin only)

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 50,
    "approved": 45,
    "pending": 5,
    "byCategory": [
      { "_id": "undergraduate", "count": 30 }
    ],
    "byYear": [
      { "_id": 2024, "count": 20 }
    ],
    "byBatch": [
      { "_id": "ISE2024", "count": 15 }
    ]
  }
}
```

---

## User Endpoints

### 1. Get All Users (Admin Only)
**GET** `/api/users`

Get all users with filtering and pagination.

**Headers:** Authorization required (Admin only)

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `role` - Filter by role (admin|student)
- `batchId` - Filter by batch ID
- `search` - Search by name or email

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [ /* array of user objects */ ],
    "pagination": { /* pagination info */ }
  }
}
```

### 2. Get User by ID
**GET** `/api/users/:id`

Get a user by ID.

**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { /* user object */ },
    "projectCount": 5
  }
}
```

### 3. Update User Profile
**PUT** `/api/users/:id`

Update user profile (name, email).

**Headers:** Authorization required

**Request Body:**
```json
{
  "name": "New Name",
  "email": "new.email@university.ac.in"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "user": { /* updated user object */ }
  }
}
```

### 4. Change Password
**POST** `/api/users/change-password`

Change user password.

**Headers:** Authorization required

**Request Body:**
```json
{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

### 5. Deactivate User (Admin Only)
**POST** `/api/users/:id/deactivate`

Deactivate a user account.

**Headers:** Authorization required (Admin only)

**Response:**
```json
{
  "success": true,
  "message": "User deactivated successfully"
}
```

### 6. Reactivate User (Admin Only)
**POST** `/api/users/:id/reactivate`

Reactivate a user account.

**Headers:** Authorization required (Admin only)

**Response:**
```json
{
  "success": true,
  "message": "User reactivated successfully"
}
```

### 7. Get User Statistics (Admin Only)
**GET** `/api/users/admin/stats`

Get user statistics.

**Headers:** Authorization required (Admin only)

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 100,
    "students": 95,
    "admins": 5,
    "inactive": 10,
    "byBatch": [
      { "_id": "ISE2024", "count": 30 }
    ],
    "recentRegistrations": 15
  }
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Error Codes:

- **400 Bad Request** - Invalid input or missing required fields
- **401 Unauthorized** - Missing or invalid authentication token
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

---

## Data Models

### User Object
```json
{
  "_id": "ObjectId",
  "email": "string",
  "name": "string",
  "role": "admin|student",
  "batchId": "string (students only)",
  "batch": "string (students only)",
  "isActive": "boolean",
  "createdAt": "ISO 8601 date",
  "updatedAt": "ISO 8601 date"
}
```

### Project Object
```json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string",
  "shortDescription": "string",
  "year": "number",
  "batch": "string",
  "batchId": "string",
  "category": "undergraduate|capstone|research|internship",
  "tags": ["string"],
  "teamMembers": [TeamMember],
  "supervisor": Supervisor,
  "images": ["string"],
  "demoUrl": "string (optional)",
  "repoUrl": "string (optional)",
  "documentUrl": "string (optional)",
  "createdBy": "ObjectId (ref: User)",
  "isApproved": "boolean",
  "approvedBy": "ObjectId (ref: User)",
  "approvedAt": "ISO 8601 date",
  "createdAt": "ISO 8601 date",
  "updatedAt": "ISO 8601 date"
}
```

### Batch Object
```json
{
  "_id": "ObjectId",
  "batchId": "string",
  "batch": "string",
  "department": "string",
  "year": "number",
  "isActive": "boolean",
  "totalStudents": "number",
  "description": "string",
  "createdBy": "ObjectId (ref: User)",
  "createdAt": "ISO 8601 date",
  "updatedAt": "ISO 8601 date"
}
```

---

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting in production.

## CORS

The backend is configured to accept requests from the frontend URL specified in the `.env` file (`FRONTEND_URL`).