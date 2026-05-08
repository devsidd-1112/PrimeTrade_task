# Task Management Full-Stack Application

A modern, production-ready full-stack task management application with a powerful REST API backend and a clean React frontend.

## Project Overview

This is a complete SaaS-ready task management platform featuring:
- **Backend**: Production-grade REST API with PostgreSQL, Prisma ORM, Redis caching
- **Frontend**: Modern React SPA with Tailwind CSS
- **Authentication**: JWT + Google OAuth
- **Performance**: 97% faster responses with Redis caching
- **Scalability**: Horizontal scaling ready with stateless architecture
- **Documentation**: Interactive Swagger API docs

## Features

### Backend Features
- **JWT Authentication** - Secure token-based authentication
- **Google OAuth** - Social login integration
- **RBAC** - Role-based access control (user/admin)
- **Redis Caching** - 97% performance improvement (339ms → 11ms)
- **Pagination** - Efficient data pagination
- **Filtering** - Filter by status and priority
- **Search** - Full-text search in tasks
- **Swagger Docs** - Interactive API documentation
- **Winston Logging** - Comprehensive logging system
- **Docker Support** - Containerized deployment
- **Database Optimization** - Indexed queries

### Frontend Features
- **Modern UI** - Clean, responsive design with Tailwind CSS
- **Authentication Flow** - Login, register, Google OAuth
- **Task Management** - Complete CRUD operations
- **Real-time Search** - Debounced search functionality
- **Advanced Filters** - Filter by status and priority
- **Pagination** - Navigate through tasks efficiently
- **Protected Routes** - Secure dashboard access
- **Toast Notifications** - User-friendly feedback
- **Loading States** - Smooth user experience
- **Mobile Responsive** - Works on all devices

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL 15
- **ORM:** Prisma 5.22.0
- **Cache:** Redis 7
- **Authentication:** JWT + Passport.js (Google OAuth)
- **Documentation:** Swagger UI
- **Logging:** Winston
- **Containerization:** Docker + Docker Compose

### Frontend
- **Library:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS
- **Notifications:** React Hot Toast

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v15 or higher)
- Redis (v7 or higher)
- Docker (optional, for containerized deployment)

## Installation & Setup

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/devsidd-1112/PrimeTrade_task.git
cd PrimeTrade_task
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file in the root directory:

```env
# Server
PORT=5000

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/primetrade_task?schema=public"

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Redis
REDIS_URL=redis://localhost:6379

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback

# Session
SESSION_SECRET=your_session_secret_change_this_in_production

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Logging
LOG_LEVEL=info
```

4. **Setup PostgreSQL database**
```bash
createdb primetrade_task
```

5. **Run database migrations**
```bash
npx prisma generate
npx prisma migrate deploy
```

6. **Start Redis**
```bash
docker run -d -p 6379:6379 redis:7-alpine
```

7. **Start backend server**
```bash
npm run dev
```

Backend will be running on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

4. **Start frontend development server**
```bash
npm run dev
```

Frontend will be running on `http://localhost:5173`

## Docker Deployment

### Start all services with Docker Compose

```bash
docker-compose up -d
```

This starts:
- PostgreSQL on port 5432
- Redis on port 6379
- Backend API on port 5000

### Stop all services

```bash
docker-compose down
```

## API Documentation

Once the backend is running, access the interactive API documentation:

**Swagger UI:** http://localhost:5000/api-docs

## API Endpoints

### Authentication
```
POST   /api/v1/auth/register              Register new user
POST   /api/v1/auth/login                 Login user
GET    /api/v1/auth/google                Google OAuth login
GET    /api/v1/auth/google/callback       OAuth callback
```

### Tasks (Protected Routes)
```
POST   /api/v1/tasks                      Create a new task
GET    /api/v1/tasks                      Get all tasks (with pagination, filtering, search)
GET    /api/v1/tasks/:id                  Get single task by ID
PUT    /api/v1/tasks/:id                  Update task
DELETE /api/v1/tasks/:id                  Delete task
```

### Query Parameters
```
?page=1&limit=10                          Pagination
?status=completed                         Filter by status (pending, in-progress, completed)
?priority=high                            Filter by priority (low, medium, high)
?search=keyword                           Search in title and description
```

## Frontend Routes

```
/                                         Redirects to /dashboard
/login                                    Login page
/register                                 Registration page
/dashboard                                Protected dashboard (requires authentication)
```

## Security Features

- **JWT Authentication** - Secure token-based auth with 7-day expiry
- **Password Hashing** - bcrypt with 10 salt rounds
- **RBAC** - Role-based access control (user/admin)
- **Input Validation** - express-validator on all endpoints
- **Security Headers** - Helmet.js for HTTP security
- **CORS** - Configurable cross-origin resource sharing
- **Ownership Checks** - Users can only access their own tasks
- **Protected Routes** - Frontend route protection
- **Token Persistence** - Secure JWT storage in localStorage
- **Auto Logout** - Automatic logout on 401 responses

## Performance Metrics

### Redis Caching Impact
```
Before Caching:  339ms (database query)
After Caching:    11ms (Redis cache hit)
Improvement:      97% faster
```

### Response Times
- Health check: **5ms**
- API docs: **3ms**
- Cached task fetch: **11ms**
- Uncached task fetch: **339ms**

## Project Structure

```
PrimeTrade_task/
├── backend/
│   ├── src/
│   │   ├── app.js                    # Express app configuration
│   │   ├── server.js                 # Server entry point
│   │   ├── config/                   # Configuration files
│   │   ├── controllers/              # Route controllers
│   │   ├── middleware/               # Custom middleware
│   │   ├── models/                   # Prisma models
│   │   ├── routes/                   # API routes
│   │   ├── utils/                    # Utility functions
│   │   ├── validations/              # Input validation rules
│   │   └── docs/                     # API documentation
│   ├── prisma/
│   │   ├── schema.prisma             # Database schema
│   │   └── migrations/               # Database migrations
│   ├── docker-compose.yml            # Multi-container setup
│   ├── Dockerfile                    # Backend container
│   └── package.json                  # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── api/                      # Axios configuration
│   │   ├── components/               # React components
│   │   ├── context/                  # React context (Auth)
│   │   ├── pages/                    # Page components
│   │   ├── services/                 # API services
│   │   ├── App.jsx                   # Main app component
│   │   └── main.jsx                  # Entry point
│   ├── public/                       # Static assets
│   └── package.json                  # Frontend dependencies
│
└── README.md                         # This file
```

## Testing the Application

### 1. Test Backend API

**Health Check:**
```bash
curl http://localhost:5000/health
```

**Register User:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Test Frontend

1. Open http://localhost:5173
2. Register a new account
3. Login with credentials
4. Create, edit, and delete tasks
5. Test search and filters
6. Test pagination

### 3. Test with Swagger UI

1. Open http://localhost:5000/api-docs
2. Click "Authorize" button
3. Enter JWT token: `Bearer YOUR_TOKEN`
4. Test any endpoint interactively

## Configuration

### Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:5000/api/v1/auth/google/callback` (development)
   - `https://your-backend-domain.com/api/v1/auth/google/callback` (production)
6. Add authorized JavaScript origins:
   - `http://localhost:5173` (development)
   - `https://your-frontend-domain.com` (production)
7. Copy Client ID and Secret to backend `.env`

## Deployment

### Backend Deployment (Render/Railway)

1. Push code to GitHub
2. Create new web service
3. Set environment variables
4. Deploy

**Environment Variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - Strong random string
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `FRONTEND_URL` - Frontend domain URL

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `frontend`
4. Set environment variable: `VITE_API_URL=https://your-backend-domain.com/api/v1`
5. Deploy

### Production Checklist

- [ ] Set strong `JWT_SECRET` (64+ character random string)
- [ ] Configure production database (PostgreSQL)
- [ ] Set up production Redis instance
- [ ] Add real Google OAuth credentials
- [ ] Update OAuth redirect URIs for production
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS for production domain
- [ ] Set up SSL/TLS certificates
- [ ] Configure monitoring and logging
- [ ] Set up automated backups
- [ ] Implement rate limiting
- [ ] Test all features in production

## Scalability

The application is designed for horizontal scaling:

- **Stateless Authentication** - JWT tokens (no server-side sessions)
- **Redis Caching** - Shared cache across multiple instances
- **Database Connection Pooling** - Efficient database connections
- **Load Balancer Ready** - Can run multiple backend instances
- **Containerized** - Easy deployment with Docker/Kubernetes
- **CDN Ready** - Frontend can be served via CDN

## Scripts

### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run prisma     # Open Prisma Studio (database GUI)
```

### Frontend Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

**Siddharth**
- GitHub: [@devsidd-1112](https://github.com/devsidd-1112)
- Repository: [PrimeTrade_task](https://github.com/devsidd-1112/PrimeTrade_task)

## Acknowledgments

- Express.js for the web framework
- Prisma for the excellent ORM
- Redis for high-performance caching
- Swagger for API documentation
- React team for the amazing library
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors

---

**Built using Node.js, Express, PostgreSQL, Prisma, Redis, React, and Tailwind CSS**

**A modern SaaS-ready full-stack task management platform with production-grade backend engineering.**
