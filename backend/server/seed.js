import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Project, Review } from './models.js';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Freelance';

async function seedDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Clear existing
    await Project.deleteMany({});
    await Review.deleteMany({});

    // Add Dress Shop Project
    const newProject = new Project({
      title: 'Dress Shop Landing Page',
      stack: 'Flutter',
      description: 'A beautiful, responsive landing page for an elegant dress shop.',
      link: 'https://dressshoplandingpage.netlify.app/'
    });
    
    await newProject.save();
    console.log('Dress Shop project seeded!');

    // Add a dummy review just for testing
    const testReview = new Review({
      quote: 'Great work on the landing page! Looks amazing.',
      author: 'John Doe'
    });
    await testReview.save();
    console.log('Test review seeded!');

    mongoose.connection.close();
  } catch (err) {
    console.error('Seeding error:', err);
    mongoose.connection.close();
  }
}

seedDB();
