# ISE Project Portal - Quick Start Guide

This guide will help you get the project up and running quickly.

## Prerequisites

Before you begin, ensure you have:
- **Node.js** (v18 or higher) installed
- **npm** (comes with Node.js)
- A **MongoDB Atlas** account (free tier is sufficient)
- A code editor (VS Code recommended)

## Step 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and sign in
3. Create a new cluster (free tier M0)
4. Create a database user:
   - Go to Database Access
   - Add New Database User
   - Choose password authentication
   - Save username and password
5. Whitelist your IP address:
   - Go to Network Access
   - Add IP Address
   - Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
6. Get your connection string:
   - Go to Database → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Step 2: Project Setup

### Clone the Repository

```bash
git clone <your-repo-url>
cd project
```

### Install Dependencies

Run the automated setup script:

```bash
./setup.sh
```

Or install manually:

```bash
# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

## Step 3: Configure Environment Variables

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

3. Edit the `.env` file with your actual values:
   ```bash
   nano .env   # or use any text editor
   ```

4. Update these important values:

   ```env
   # MongoDB Atlas Connection String
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/ise_project_portal?retryWrites=true&w=majority
   
   # JWT Secret (generate a random string)
   JWT_SECRET=your_very_long_and_random_secret_key_here_at_least_32_characters
   
   # Admin Credentials (used for initial setup)
   ADMIN_EMAIL=admin@university.ac.in
   ADMIN_PASSWORD=admin123
   ```

5. Save and close the file

## Step 4: Start the Servers

### Option 1: Use the Start Script (Recommended)

From the project root:

```bash
./start-dev.sh
```

This will start both backend and frontend servers.

### Option 2: Start Manually

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 5: Initialize Admin User

Once both servers are running, initialize the admin user:

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/health
curl -X POST http://localhost:5000/api/auth/init-admin
```

**Or using your browser:**
Navigate to: `http://localhost:5000/api/auth/init-admin`

## Step 6: Access the Application

Open your browser and navigate to:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## Step 7: Login as Admin

1. Go to http://localhost:5173/admin/login
2. Login with:
   - Email: `admin@university.ac.in`
   - Password: `admin123`

## Step 8: Create Your First Batch

After logging in as admin:

1. Use Postman, curl, or create an admin dashboard page
2. Send a POST request to create a batch:

```bash
curl -X POST http://localhost:5000/api/auth/create-batch \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_admin_token>" \
  -d '{
    "batchId": "ISE2024",
    "batch": "2020-2024",
    "department": "Information Science and Engineering",
    "year": 2024,
    "totalStudents": 60
  }'
```

## Step 9: Register a Student

Register a student for the batch you created:

```bash
curl -X POST http://localhost:5000/api/auth/register-student \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_admin_token>" \
  -d '{
    "email": "student1@university.ac.in",
    "password": "student123",
    "name": "Test Student",
    "batchId": "ISE2024",
    "batch": "2020-2024"
  }'
```

## Step 10: Login as Student

1. Go to http://localhost:5173/student/login
2. Login with:
   - Email: `student1@university.ac.in`
   - Password: `student123`
   - Batch ID: `ISE2024`

## Troubleshooting

### Port Already in Use

If you see "Port 5000 is already in use":

```bash
# Find and kill the process using port 5000
lsof -ti:5000 | xargs kill -9

# Or use a different port in backend/.env
PORT=5001
```

### MongoDB Connection Error

- Double-check your connection string in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify database user credentials
- Check if the cluster is active

### JWT Token Errors

- Make sure `JWT_SECRET` is set in `.env`
- Try logging out and logging in again
- Clear browser localStorage

### CORS Errors

- Ensure `FRONTEND_URL` in backend/.env matches your frontend URL
- Check that both servers are running

### Module Not Found

```bash
# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Testing the API

### Using curl

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@university.ac.in","password":"admin123"}'
```

### Using Postman

1. Import the API collection (if provided)
2. Set base URL: `http://localhost:5000/api`
3. Add Authorization header for protected routes

## Next Steps

1. **Build Admin Dashboard** - Create pages for managing batches and students
2. **Build Student Dashboard** - Create pages for submitting projects
3. **Add File Upload** - Implement Cloudinary for image uploads
4. **Add Email Notifications** - Notify students when projects are approved
5. **Deploy** - Deploy to production (Vercel/Netlify for frontend, Railway/Heroku for backend)

## Production Deployment Checklist

Before deploying to production:

- [ ] Change admin credentials in `.env`
- [ ] Use a strong JWT secret
- [ ] Enable HTTPS
- [ ] Set up proper CORS policies
- [ ] Add rate limiting
- [ ] Set up monitoring and logging
- [ ] Configure MongoDB backup
- [ ] Set `NODE_ENV=production`
- [ ] Minify and optimize frontend build

## Useful Commands

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# View backend logs
cd backend && npm run dev

# Build frontend for production
cd frontend && npm run build

# Preview production build
cd frontend && npm run preview

# Run linter
cd frontend && npm run lint
```

## Getting Help

- Check [README.md](../README.md) for detailed documentation
- See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API details
- Review error logs in terminal
- Check browser console for frontend errors

## Common Workflows

### Adding a New Batch

1. Login as admin
2. POST to `/api/auth/create-batch`
3. Provide batch details (ID, year, department)

### Registering Multiple Students

Create a script or use a CSV import feature:

```javascript
// Example: registerStudents.js
const students = [
  { email: 'student1@...', name: '...', batchId: 'ISE2024' },
  // ... more students
];

for (const student of students) {
  await fetch('/api/auth/register-student', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify(student)
  });
}
```

### Approving Projects

1. Login as admin
2. GET `/api/projects?approved=false` to see pending projects
3. POST to `/api/projects/{id}/approve` with `{ "approve": true }`

---

**You're all set! Happy coding! 🚀**