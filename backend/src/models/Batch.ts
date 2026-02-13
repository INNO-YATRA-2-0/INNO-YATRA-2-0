import mongoose, { Document, Schema } from 'mongoose';

export interface IBatch extends Document {
  batchId: string; // Unique batch identifier (e.g., "ISE2024", "CSE2023")
  batch: string; // Batch year range (e.g., "2020-2024")
  department: string;
  year: number; // Graduation year
  isActive: boolean;
  totalStudents?: number;
  description?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BatchSchema: Schema = new Schema({
  batchId: {
    type: String,
    required: [true, 'Batch ID is required'],
    unique: true,
    trim: true,
    uppercase: true,
    maxlength: [20, 'Batch ID cannot exceed 20 characters'],
    match: [/^[A-Z0-9]+$/, 'Batch ID must contain only uppercase letters and numbers']
  },
  batch: {
    type: String,
    required: [true, 'Batch year range is required'],
    trim: true,
    match: [/^\d{4}-\d{4}$/, 'Batch must be in format YYYY-YYYY']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
    maxlength: [100, 'Department cannot exceed 100 characters']
  },
  year: {
    type: Number,
    required: [true, 'Graduation year is required'],
    min: [2000, 'Year cannot be less than 2000'],
    max: [new Date().getFullYear() + 10, 'Year cannot be too far in the future']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  totalStudents: {
    type: Number,
    min: [0, 'Total students cannot be negative'],
    default: 0
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes for better performance
BatchSchema.index({ batchId: 1 });
BatchSchema.index({ year: 1 });
BatchSchema.index({ department: 1 });
BatchSchema.index({ isActive: 1 });

export default mongoose.model<IBatch>('Batch', BatchSchema);