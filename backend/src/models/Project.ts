import mongoose, { Document, Schema } from 'mongoose';

export interface ITeamMember {
  name: string;
  email?: string;
  linkedIn?: string;
  github?: string;
  role?: string;
}

export interface ISupervisor {
  name: string;
  email: string;
  department: string;
  title: string;
}

export interface IProject extends Document {
  title: string;
  description: string;
  shortDescription: string;
  year: number;
  batch: string;
  batchId: string; // Links to the student's batch ID
  category: string;
  tags: string[];
  teamMembers: ITeamMember[];
  supervisor: ISupervisor;
  images: string[];
  demoUrl?: string;
  repoUrl?: string;
  documentUrl?: string;
  createdBy: mongoose.Types.ObjectId; // Reference to User who created this project
  isApproved: boolean;
  approvedBy?: mongoose.Types.ObjectId; // Reference to Admin who approved
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Team member name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  linkedIn: {
    type: String,
    trim: true
  },
  github: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    trim: true,
    maxlength: [30, 'Role cannot exceed 30 characters']
  }
}, { _id: false });

const SupervisorSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Supervisor name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Supervisor email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
    maxlength: [100, 'Department name cannot exceed 100 characters']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [50, 'Title cannot exceed 50 characters']
  }
}, { _id: false });

const ProjectSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [500, 'Short description cannot exceed 500 characters']
  },
  year: {
    type: Number,
    required: [true, 'Project year is required'],
    min: [2000, 'Year cannot be less than 2000'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  batch: {
    type: String,
    required: [true, 'Batch is required'],
    trim: true
  },
  batchId: {
    type: String,
    required: [true, 'Batch ID is required'],
    trim: true,
    uppercase: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['undergraduate', 'capstone', 'research', 'internship'],
    lowercase: true
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  teamMembers: {
    type: [TeamMemberSchema],
    required: [true, 'At least one team member is required'],
    validate: {
      validator: function(v: ITeamMember[]) {
        return v && v.length >= 1 && v.length <= 6;
      },
      message: 'Team must have 1-6 members'
    }
  },
  supervisor: {
    type: SupervisorSchema,
    required: [true, 'Supervisor information is required']
  },
  images: [{
    type: String,
    trim: true
  }],
  demoUrl: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  repoUrl: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  documentUrl: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better performance
ProjectSchema.index({ year: 1, batch: 1 });
ProjectSchema.index({ batchId: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ tags: 1 });
ProjectSchema.index({ createdBy: 1 });
ProjectSchema.index({ isApproved: 1 });
ProjectSchema.index({ title: 'text', description: 'text', shortDescription: 'text' });

export default mongoose.model<IProject>('Project', ProjectSchema);