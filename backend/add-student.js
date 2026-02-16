const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function addStudent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student-projects');
    
    const userSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String, required: true },
      role: { type: String, enum: ['admin', 'student'], required: true },
      batchId: String,
      batch: String,
      isActive: { type: Boolean, default: true },
    }, { timestamps: true });
    
    userSchema.pre('save', async function(next) {
      if (!this.isModified('password')) return next();
      this.password = await bcrypt.hash(this.password, 10);
      next();
    });
    
    const User = mongoose.model('User', userSchema);
    
    const batchSchema = new mongoose.Schema({
      batchId: { type: String, required: true, unique: true },
      batch: { type: String, required: true },
      department: { type: String, required: true },
      year: { type: Number, required: true },
      totalStudents: Number,
      description: String,
      isActive: { type: Boolean, default: true },
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }, { timestamps: true });
    
    const Batch = mongoose.model('Batch', batchSchema);
    
    // Create batch
    await Batch.findOneAndUpdate(
      { batchId: 'ISE202604' },
      {
        batchId: 'ISE202604',
        batch: '2022-2026',
        department: 'Information Science & Engineering',
        year: 2026,
        totalStudents: 60,
        description: 'ISE Batch 4 - 2022-2026',
        isActive: true
      },
      { upsert: true, new: true }
    );
    
    // Create student
    const student = new User({
      email: 'lavanyamin17@gmail.com',
      password: 'batchise@03',
      name: 'Lavanya Min',
      role: 'student',
      batchId: 'ISE202604',
      batch: '2022-2026',
      isActive: true
    });
    
    await student.save();
    
    console.log('✅ Student account created successfully!');
    console.log('📧 Email: lavanyamin17@gmail.com');  
    console.log('🔐 Password: batchise@03');
    console.log('🎓 Batch ID: ISE202604');
    
  } catch (error) {
    if (error.code === 11000) {
      console.log('⚠️  User already exists with this email');
    } else {
      console.log('❌ Error:', error.message);
    }
  } finally {
    mongoose.disconnect();
  }
}

addStudent();