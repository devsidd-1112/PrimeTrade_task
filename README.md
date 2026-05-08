# Task Management REST API

A production-ready, scalable Task Management REST API built with Node.js, Express, and MongoDB. This backend features JWT authentication, role-based access control (RBAC), comprehensive validation, and professional architecture.

## 🚀 Features

- ✅ **User Authentication** - Secure registration and login with JWT
- ✅ **Password Security** - Bcrypt hashing with salt rounds
- ✅ **Role-Based Authorization** - User and Admin roles with different permissions
- ✅ **Task CRUD Operations** - Complete Create, Read, Update, Delete functionality
- ✅ **Ownership Checks** - Users can only modify their own tasks (admins can modify all)
- ✅ **Input Validation** - Express-validator for all incoming requests
- ✅ **Centralized Error Handling** - Consistent error responses across the API
- ✅ **Security Best Practices** - Helmet, CORS, JWT expiration
- ✅ **API Versioning** - All routes prefixed with `/api/v1`
- ✅ **Modular Architecture** - Separation of concerns with clean folder structure

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **Security:** helmet, cors
- **Logging:** morgan
- **Environment:** dotenv

## 📁 Project Structure

```
backend/
│
├── src/
│   ├── config/
│   │   └── db.js                 # Database connection
│   │
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── taskController.js     # Task CRUD logic
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   ├── roleMiddleware.js     # Role-based authorization
│   │   ├── errorMiddleware.js    # Centralized error handling
│   │   └── validationMiddleware.js # Validation error handling
│   │
│   ├── models/
│   │   ├── User.js               # User schema with password hashing
│   │   └── Task.js               # Task schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── taskRoutes.js         # Task endpoints
│   │
│   ├── utils/
│   │   └── generateToken.js      # JWT token generation
│   │
│   ├── validations/
│   │   ├── authValidation.js     # Auth input validation rules
│   │   └── taskValidation.js     # Task input validation rules
│   │
│   ├── app.js                    # Express app configuration
│   └── server.js                 # Server entry point
│
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/primetrade-task-management
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For local MongoDB
   mongod
   
   # Or use MongoDB Atlas connection string in MONGO_URI
   ```

5. **Run the application**
   
   Development mode (with nodemon):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

6. **Verify the server is running**
   
   Visit: `http://localhost:5000/health`
   
   Expected response:
   ```json
   {
     "success": true,
     "message": "Server is running"
   }
   ```

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/auth/register` | Register new user | Public |
| POST | `/api/v1/auth/login` | Login user | Public |

### Task Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/v1/tasks` | Get all tasks | Private |
| POST | `/api/v1/tasks` | Create new task | Private |
| GET | `/api/v1/tasks/:id` | Get single task | Private |
| PUT | `/api/v1/tasks/:id` | Update task | Private (Owner/Admin) |
| DELETE | `/api/v1/tasks/:id` | Delete task | Private (Owner/Admin) |

## 📝 API Usage Examples

### 1. Register User

**Request:**
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 2. Login User

**Request:**
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 3. Create Task

**Request:**
```http
POST /api/v1/tasks
Content-Type: application/json
Authorization: Bearer <your_jwt_token>

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "pending",
  "priority": "high"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "status": "pending",
    "priority": "high",
    "createdBy": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 4. Get All Tasks

**Request:**
```http
GET /api/v1/tasks
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Complete project documentation",
      "description": "Write comprehensive README and API docs",
      "status": "pending",
      "priority": "high",
      "createdBy": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 5. Update Task

**Request:**
```http
PUT /api/v1/tasks/507f1f77bcf86cd799439012
Content-Type: application/json
Authorization: Bearer <your_jwt_token>

{
  "status": "in-progress",
  "priority": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "status": "in-progress",
    "priority": "medium",
    "createdBy": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

### 6. Delete Task

**Request:**
```http
DELETE /api/v1/tasks/507f1f77bcf86cd799439012
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {}
}
```

## 🔒 Security Features

1. **Password Hashing** - All passwords are hashed using bcrypt with 10 salt rounds
2. **JWT Authentication** - Secure token-based authentication with expiration
3. **Protected Routes** - Middleware to verify JWT tokens on protected endpoints
4. **Role-Based Access Control** - Different permissions for users and admins
5. **Ownership Checks** - Users can only modify their own resources
6. **Input Validation** - All inputs validated before processing
7. **Helmet** - Security headers to protect against common vulnerabilities
8. **CORS** - Cross-Origin Resource Sharing configuration
9. **Error Handling** - No sensitive information leaked in error responses

## 🎯 Role-Based Authorization

### User Role
- Can register and login
- Can create tasks
- Can view only their own tasks
- Can update only their own tasks
- Can delete only their own tasks

### Admin Role
- All user permissions
- Can view all tasks from all users
- Can update any task
- Can delete any task

## ✅ Validation Rules

### Registration
- **Name:** Required, minimum 2 characters
- **Email:** Required, valid email format
- **Password:** Required, minimum 6 characters

### Login
- **Email:** Required, valid email format
- **Password:** Required

### Task Creation
- **Title:** Required, not empty
- **Status:** Optional, must be one of: `pending`, `in-progress`, `completed`
- **Priority:** Optional, must be one of: `low`, `medium`, `high`

### Task Update
- **Title:** Optional, but cannot be empty if provided
- **Status:** Optional, must be valid enum value
- **Priority:** Optional, must be valid enum value

## 🚨 Error Handling

All errors return a consistent format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request (validation errors, duplicate entries)
- **401** - Unauthorized (invalid/missing token)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found
- **500** - Internal Server Error

## 🧪 Testing the API

You can test the API using:
- **Postman** - Import the endpoints and test
- **Thunder Client** - VS Code extension
- **cURL** - Command line testing
- **Insomnia** - API testing tool

### Example cURL Commands

**Register:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Create Task:**
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"My Task","description":"Task description","priority":"high"}'
```

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/dbname |
| JWT_SECRET | Secret key for JWT signing | your_secret_key_here |
| JWT_EXPIRE | JWT token expiration time | 7d |

## 📦 Dependencies

### Production Dependencies
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT implementation
- **express-validator** - Input validation
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing
- **helmet** - Security headers
- **morgan** - HTTP request logger

### Development Dependencies
- **nodemon** - Auto-restart server on changes

## 🎓 Key Backend Concepts Implemented

1. **MVC Architecture** - Separation of Models, Controllers, and Routes
2. **Middleware Pattern** - Authentication, validation, error handling
3. **JWT Authentication** - Stateless authentication mechanism
4. **RBAC** - Role-Based Access Control
5. **Ownership Checks** - Resource-level authorization
6. **Input Validation** - Data integrity and security
7. **Error Handling** - Centralized and consistent
8. **Security Best Practices** - Helmet, CORS, password hashing
9. **RESTful API Design** - Proper HTTP methods and status codes
10. **API Versioning** - Future-proof API structure

## 🚀 Production Considerations

Before deploying to production:

1. **Change JWT_SECRET** to a strong, random string
2. **Use MongoDB Atlas** or a production database
3. **Enable HTTPS** for secure communication
4. **Set NODE_ENV** to `production`
5. **Implement rate limiting** to prevent abuse
6. **Add logging** for monitoring and debugging
7. **Set up CI/CD** pipeline
8. **Configure CORS** for specific origins
9. **Add API documentation** (Swagger/OpenAPI)
10. **Implement database backups**

## 📄 License

This project is created for the Primetrade.ai Backend Developer Internship Assignment.

## 👨‍💻 Author

Backend Developer Intern Candidate

---

**Note:** This is Phase 1 of the project focusing on core backend functionality. Future phases may include OAuth, Redis caching, Docker containerization, Swagger documentation, and deployment.
