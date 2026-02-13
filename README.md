# ISE Project Portal

A full-stack web application for managing and showcasing ISE (Information Science and Engineering) student projects with role-based access control.

## Features

### Admin Features
- 🔐 Secure admin authentication
- 👥 User management (register students, manage batches)
- 📊 Project approval/rejection system
- 📈 Analytics and statistics dashboard
- 🏷️ Batch management with unique IDs

### Student Features
- 🎓 Batch-wise authentication system
- 📝 Project submission and management
- 👥 Team collaboration features
- 🔄 Project editing (before approval)
- 📱 Responsive design for all devices

### General Features
- 🌐 Public project showcase
- 🔍 Advanced search and filtering
- 📂 Category-based organization
- 🎯 Real-time project statistics
- 🔒 Secure API with JWT authentication

## Tech Stack

### Backend
- **Node.js** with **TypeScript**
- **Express.js** web framework
- **MongoDB Atlas** database
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Mongoose** ODM
- **Cloudinary** for image uploads

### Frontend
- **React** with **TypeScript**
- **Vite** for development and building
- **TailwindCSS** for styling
- **React Router** for navigation
- **Lucide React** for icons

## Project Structure

```
project/
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Authentication & validation
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   └── server.ts        # Express server
│   ├── .env                 # Environment variables
│   └── package.json
│
└── frontend/                # React frontend
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/           # Page components
    │   ├── services/        # API services
    │   ├── types/           # TypeScript types
    │   └── utils/           # Utility functions
    └── package.json
```

## Setup Instructions

### Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB Atlas** account
- **Git**

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd project
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
nano .env
```

#### Environment Configuration

Edit the `.env` file with your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Configuration  
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ise_project_portal?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_at_least_32_characters_long
JWT_EXPIRES_IN=7d

# Admin Credentials (for initial setup)
ADMIN_EMAIL=admin@university.ac.in
ADMIN_PASSWORD=admin123

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

#### MongoDB Atlas Setup

1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string and update `MONGODB_URI` in `.env`
5. Add your IP address to the whitelist

#### Start Backend Server

```bash
# Development mode
npm run dev

# Build and start production
npm run build
npm start
```

The backend will run on http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on http://localhost:5173

### 4. Initialize Admin User

After both servers are running, initialize the admin user:

```bash
curl -X POST http://localhost:5000/api/auth/init-admin
```

Or visit: http://localhost:5173/admin/login and the system will prompt admin creation.

### 5. Create Batches and Students

1. Login as admin using the credentials from `.env`
2. Create batches (e.g., "ISE2024", "CSE2023")
3. Register students with their batch IDs
4. Students can now login with their email, password, and batch ID

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login (admin/student)
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/register-student` - Register student (admin only)
- `POST /api/auth/create-batch` - Create batch (admin only)
- `GET /api/auth/batches` - Get all batches (admin only)

### Projects
- `GET /api/projects` - Get all projects (with filters)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (student only)
- `PUT /api/projects/:id` - Update project (creator only)
- `POST /api/projects/:id/approve` - Approve/reject project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/change-password` - Change password

## Default Login Credentials

### Admin
- Email: `admin@university.ac.in`
- Password: `admin123`

### Creating Students
Students must be registered by admin with:
- Email address
- Name
- Batch ID (e.g., "ISE2024")
- Batch range (e.g., "2020-2024")
- Password

## Usage Guide

### For Administrators

1. **Login** with admin credentials
2. **Create Batches** for different cohorts
3. **Register Students** with batch assignments
4. **Review and Approve** submitted projects
5. **Monitor Statistics** and user activity

### For Students

1. **Login** with email, password, and batch ID
2. **Submit Projects** with team and supervisor details
3. **Edit Projects** before approval
4. **View Projects** from all approved batches

### For Public Users

1. **Browse Projects** without authentication
2. **Filter by Category** or search by keywords
3. **View Project Details** including team info and links

## Development

### Backend Development

```bash
cd backend

# Watch mode for development
npm run dev

# Type checking
npm run build

# Run with node
npm start
```

### Frontend Development

```bash
cd frontend

# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Security Features

- 🔐 JWT-based authentication
- 🔒 Password hashing with bcrypt
- 🛡️ Role-based access control
- ⚡ Input validation and sanitization
- 🌐 CORS protection
- 📝 Request rate limiting

## Database Schema

### Users
- Email, password, role (admin/student)
- Batch information for students
- Account status and timestamps

### Projects  
- Title, description, category, year
- Team members and supervisor details
- Approval status and admin actions
- Links to demos, repositories, documents

### Batches
- Batch ID, year range, department
- Student count and status
- Creation metadata

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check your MongoDB Atlas connection string
   - Ensure your IP is whitelisted
   - Verify database user permissions

2. **JWT Token Errors**
   - Check JWT_SECRET in environment variables
   - Clear browser localStorage and login again

3. **CORS Issues**
   - Verify FRONTEND_URL in backend .env
   - Check if both servers are running

4. **Build Failures**
   - Clear node_modules: `rm -rf node_modules package-lock.json && npm install`
   - Check Node.js version compatibility

### API Testing

Use curl or Postman to test API endpoints:

```bash
# Test server health
curl http://localhost:5000/api/health

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@university.ac.in","password":"admin123"}'
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

Built with ❤️ for ISE Department
