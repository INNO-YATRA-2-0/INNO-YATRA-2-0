require('dotenv').config();
const mongoose = require('mongoose');
const Batch = require('./dist/models/Batch').default;
const User = require('./dist/models/User').default;

const batches = [
  // ISE 2026 Batches Only
  {
    batchId: 'ISE202601',
    batch: '2022-2026',
    department: 'Information Science and Engineering',
    year: 2026,
    totalStudents: 60,
    description: 'ISE Batch 01 - 2022-2026',
    isActive: true
  },
  {
    batchId: 'ISE202602', 
    batch: '2022-2026',
    department: 'Information Science and Engineering',
    year: 2026,
    totalStudents: 60,
    description: 'ISE Batch 02 - 2022-2026',
    isActive: true
  },
  {
    batchId: 'ISE202603',
    batch: '2022-2026', 
    department: 'Information Science and Engineering',
    year: 2026,
    totalStudents: 55,
    description: 'ISE Batch 03 - 2022-2026',
    isActive: true
  }
];

const seedBatches = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ise-project-portal');
    console.log('Connected to MongoDB');

    // Find or create an admin user to use as createdBy
    let admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.log('No admin user found, creating default admin...');
      admin = new User({
        email: 'admin@example.com',
        password: 'admin123',
        name: 'System Admin',
        role: 'admin',
        isActive: true
      });
      await admin.save();
      console.log('Default admin created');
    }

    // Clear existing batches
    await Batch.deleteMany({});
    console.log('Cleared existing batches');

    // Add createdBy to all batches
    const batchesWithCreator = batches.map(batch => ({
      ...batch,
      createdBy: admin._id
    }));

    // Insert new batches
    await Batch.insertMany(batchesWithCreator);
    console.log('Seeded batches successfully');

    // Display created batches
    const createdBatches = await Batch.find().sort({ batchId: 1 });
    console.log('\nCreated Batches:');
    createdBatches.forEach(batch => {
      console.log(`- ${batch.batchId}: ${batch.department} (${batch.totalStudents} students)`);
    });

    console.log('\nISE 2026 Batches:');
    const iseBatches = createdBatches.filter(batch => 
      batch.batchId.toLowerCase().includes('ise2026')
    );
    iseBatches.forEach(batch => {
      console.log(`- ${batch.batchId}: ${batch.description}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding batches:', error);
    process.exit(1);
  }
};

seedBatches();
