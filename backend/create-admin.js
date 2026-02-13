require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Define User schema (simplified)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student'], default: 'student' },
  isActive: { type: Boolean, default: true },
  batchId: String,
  batch: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'kishanbhandary0@gmail.com' });
    
    if (existingAdmin) {
      console.log('Admin kishanbhandary0@gmail.com already exists!');
      console.log('Admin ID:', existingAdmin._id);
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('kishan123', 10);

    // Create new admin
    const admin = new User({
      name: 'Kishan Bhandary',
      email: 'kishanbhandary0@gmail.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });

    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log('Email:', admin.email);
    console.log('Password: kishan123');
    console.log('Role:', admin.role);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
