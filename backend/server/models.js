import mongoose from 'mongoose';

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  stack: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String },
});

// Review Schema
const reviewSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Email Log Schema
const emailLogSchema = new mongoose.Schema({
  senderEmail: { type: String, required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  status: { type: String, default: 'logged' } // e.g., 'logged', 'sent', 'failed'
});

export const Project = mongoose.model('Project', projectSchema);
export const Review = mongoose.model('Review', reviewSchema);
export const EmailLog = mongoose.model('EmailLog', emailLogSchema);
