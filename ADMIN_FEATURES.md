# ISE-Only Admin Dashboard Features

## Overview
This portal has been optimized specifically for **Information Science and Engineering (ISE)** students only. All non-ISE departments have been removed to focus exclusively on ISE project management.

### 1. ✅ **ISE-Only Student Management**
- **Add ISE Students**: Create accounts only for ISE batch students
- **Student List View**: View all ISE students with their details
- **Delete Students**: Remove student accounts with confirmation
- **Password Distribution**: Admin provides passwords to student team leaders

### 2. ✅ **Enhanced ISE 2026 Project Filtering**
- **ISE 2026 Batches Button**: Dedicated button showing all ISE2026 sub-branches
- **Branch-Specific Filtering**: Click specific branches (ISE202601, ISE202602, etc.) to view their projects
- **Hierarchical Navigation**: First click shows dropdown, selecting branch filters projects

### 3. ✅ **Delete Functionality**
- **Delete Projects**: Remove projects with admin confirmation
- **Delete Students**: Deactivate student accounts permanently
- **Confirmation Dialogs**: Safety prompts before deletion

## Features Details

### ISE-Only Portal
- **Restricted Access**: Only ISE batches are available
- **Department Focus**: No CSE, ECE, or other department options
- **ISE Batch Types**:
  - ISE202601, ISE202602, ISE202603 (2026 batches)
  - ISE202501, ISE202502 (2025 batches)  
  - ISE202401 (2024 batch)
  - ISE202701 (2027 batch)

### ISE 2026 Enhanced Filtering

#### Button Behavior:
1. **First Click**: Opens dropdown showing all ISE2026 batches
2. **Branch Selection**: Click specific batch (e.g., ISE202601) to filter projects  
3. **Visual Feedback**: Purple highlighting for ISE2026 selections

#### Available ISE 2026 Branches:
- **ISE202601**: ISE Batch 01 (60 students)
- **ISE202602**: ISE Batch 02 (60 students)
- **ISE202603**: ISE Batch 03 (55 students)

### Delete Operations

#### Project Deletion:
- Admin can delete any project
- Confirmation dialog with project title
- Permanent removal from database
- Refresh list after deletion

#### Student Deletion:
- Admin can deactivate student accounts
- Confirmation dialog with student name
- Account becomes inactive
- Updates student list immediately

## Technical Implementation

### Frontend Changes
- **ISE-Only Filtering**: Batches filtered to show only ISE departments
- **Enhanced Dropdown**: ISE 2026 button with sub-batch selection
- **Delete Buttons**: Trash icons in project and student lists
- **Confirmation Dialogs**: Native browser confirm() for safety
- **API Integration**: Uses existing projectsAPI and usersAPI services

### Backend Support
- **Delete APIs**: 
  - `DELETE /api/projects/:id` - Remove projects
  - `POST /api/users/:id/deactivate` - Deactivate students
- **ISE-Only Seeding**: Updated batch seed data for ISE departments only

### Database Schema
- **ISE Batches Only**: Seed data includes only ISE department batches
- **Multi-year Support**: ISE batches from 2024-2027
- **Proper Relationships**: Projects linked to ISE batches only

## Setup Instructions

### 1. Seed ISE-Only Data
```bash
cd backend
node seed-batches.js
```

### 2. Compile Frontend
```bash
cd frontend
npm run build
```

### 3. Start Services
```bash
# Backend
cd backend
npm run dev

# Frontend  
cd frontend
npm run dev
```

## Usage Flow

### For ISE Admins:

#### Student Management:
1. Navigate to "Student Management" tab
2. Add ISE students with batch selection
3. View comprehensive student table
4. Delete inactive/unnecessary accounts
5. Share credentials with ISE team leaders

#### Project Management:
1. Use "All ISE Projects" for overview
2. Click "ISE 2026 Batches" for dropdown
3. Select specific batch (ISE202601, ISE202602, etc.)
4. View filtered project lists  
5. Edit or delete projects as needed

### For ISE Students:
1. Receive ISE batch credentials from team leader
2. Login with ISE-specific email/password
3. Access ISE student dashboard
4. Submit projects under assigned ISE batch

## ISE Batch Structure

### Current ISE Batches:
- **2026 Graduates**: ISE202601, ISE202602, ISE202603 (175 students total)
- **2025 Graduates**: ISE202501, ISE202502 (118 students total)
- **2024 Graduates**: ISE202401 (65 students total)  
- **2027 Graduates**: ISE202701 (62 students total)

### Naming Convention:
- **Format**: `ISE[YEAR][BATCH_NUMBER]`
- **Example**: ISE202601 = ISE Department, 2026 graduation, batch 01
- **Department**: All batches are Information Science and Engineering only

## Security & Access

### Admin Privileges:
- Create ISE student accounts only
- Delete projects and students
- Access all ISE batch data
- Manage ISE-specific configurations

### Student Restrictions:
- Access limited to assigned ISE batch
- Cannot view other ISE batch projects
- Submit projects under their ISE batch only
- Login requires valid ISE batch ID

## Benefits of ISE-Only Portal

### For ISE Department:
- **Focused Management**: No other department clutter
- **Streamlined Workflow**: ISE-specific batch handling
- **Better Organization**: Clear ISE project categorization  
- **Enhanced Security**: Access limited to ISE community

### For ISE Students:
- **Relevant Content**: Only ISE projects and batches visible
- **Department Identity**: Clear ISE branding and focus
- **Simplified Navigation**: No confusion with other departments
- **Team Coordination**: ISE-specific team leader structure

### For System Performance:
- **Reduced Data Load**: Smaller dataset for faster queries
- **Optimized Filtering**: ISE-specific search and filter options
- **Cleaner Interface**: Removed non-ISE elements
- **Better Scalability**: Focus on ISE growth only

This ISE-only implementation provides a dedicated, streamlined experience for the Information Science and Engineering department, with enhanced project filtering, complete delete functionality, and optimized ISE batch management.