# Task Management Frontend

Modern React frontend for the Task Management API built with Vite, React Router, and Tailwind CSS.

## Features

- **Authentication**
  - Login with email/password
  - Register new account
  - Google OAuth integration
  - JWT token persistence
  - Protected routes

- **Task Management**
  - Create, read, update, delete tasks
  - Real-time search with debouncing
  - Filter by status and priority
  - Pagination support
  - Responsive design

- **User Experience**
  - Clean, modern UI
  - Loading states
  - Error handling
  - Success notifications
  - Mobile-friendly

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Hot Toast** - Notifications

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Backend API running on http://localhost:5000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

3. Start development server:
```bash
npm run dev
```

The app will be available at http://localhost:5173

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── axios.js              # Axios configuration with interceptors
│   ├── components/
│   │   ├── FilterBar.jsx         # Status and priority filters
│   │   ├── Navbar.jsx            # Navigation bar with user info
│   │   ├── Pagination.jsx        # Pagination controls
│   │   ├── ProtectedRoute.jsx    # Route protection wrapper
│   │   ├── SearchBar.jsx         # Search with debouncing
│   │   ├── TaskCard.jsx          # Task display card
│   │   └── TaskForm.jsx          # Create/edit task form
│   ├── context/
│   │   └── AuthContext.jsx       # Authentication context
│   ├── pages/
│   │   ├── Dashboard.jsx         # Main task management page
│   │   ├── Login.jsx             # Login page
│   │   └── Register.jsx          # Registration page
│   ├── services/
│   │   ├── authService.js        # Authentication API calls
│   │   └── taskService.js        # Task API calls
│   ├── App.jsx                   # Main app component with routing
│   ├── main.jsx                  # App entry point
│   └── index.css                 # Global styles with Tailwind
├── .env                          # Environment variables
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
└── vite.config.js                # Vite configuration
```

## Features in Detail

### Authentication Flow

1. **Login**: User enters credentials → API validates → JWT token stored → Redirect to dashboard
2. **Register**: User creates account → API creates user → JWT token stored → Redirect to dashboard
3. **Google OAuth**: User clicks Google button → Redirects to backend OAuth → Returns with token → Dashboard
4. **Protected Routes**: Checks for JWT token → Redirects to login if not authenticated

### Task Management

- **Create**: Modal form with validation
- **Read**: Grid view with pagination
- **Update**: Edit in modal with pre-filled data
- **Delete**: Confirmation prompt before deletion

### Search & Filters

- **Search**: Debounced input (500ms delay) searches title and description
- **Status Filter**: Filter by pending, in-progress, or completed
- **Priority Filter**: Filter by low, medium, or high
- **Combined**: All filters work together with pagination

### State Management

- **Auth Context**: Global authentication state
- **Local Storage**: Persists JWT token and user info
- **Axios Interceptors**: Automatically attaches token to requests

## API Integration

All API calls go through the Axios instance configured in `src/api/axios.js`:

- Base URL from environment variable
- Automatic JWT token attachment
- 401 error handling (auto-logout)
- Request/response interceptors

## Environment Variables

```env
VITE_API_URL=http://localhost:5000/api/v1
```

For production, update to your deployed backend URL.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variable: `VITE_API_URL`
4. Deploy

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
