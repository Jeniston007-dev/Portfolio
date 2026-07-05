import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { profile } from '../../shared/profile.js';
import { Project, Review, EmailLog } from './models.js';

dotenv.config();

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Freelance';
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB (Freelance database)'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Set up Nodemailer transporter
// You need to set EMAIL_USER and EMAIL_PASS in your backend/.env file
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

function buildFallbackReply(message) {
  const text = message.toLowerCase();

  if (text.includes('service') || text.includes('offer') || text.includes('build')) {
    return `I specialize in ${profile.services.map((service) => service.title).join(', ')}. I can help you turn a rough idea into a clean launch-ready product.`;
  }

  if (text.includes('availability') || text.includes('available') || text.includes('open')) {
    return `${profile.availability}. I typically respond quickly and can start a new project once the scope is clear.`;
  }

  if (text.includes('contact') || text.includes('fiverr') || text.includes('hire')) {
    return `Serious inquiries are welcome. You can reach out through Fiverr or email me at ${profile.contactEmail}.`;
  }

  return `I’m ${profile.name}, a ${profile.title.toLowerCase()} focused on ${profile.skills.slice(0, 4).join(', ')}. I can help you shape a useful product and guide it from concept to launch.`;
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', profile: profile.name });
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'A message is required.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.json({ reply: buildFallbackReply(message) });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-latest',
        max_tokens: 220,
        system: `You are ${profile.name}'s AI assistant for a developer portfolio. You know their skills in ${profile.skills.join(', ')}. Keep answers under three sentences and encourage serious inquiries to contact them on Fiverr or by email.`,
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await response.json();
    const text = data?.content?.[0]?.text || buildFallbackReply(message);
    return res.json({ reply: text });
  } catch (error) {
    return res.json({ reply: buildFallbackReply(message) });
  }
});

// GET /api/projects - Fetch projects from MongoDB
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ _id: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/reviews - Fetch reviews from MongoDB
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST /api/reviews - Submit a new review
app.post('/api/reviews', async (req, res) => {
  try {
    const { author, quote } = req.body;
    if (!author || !quote) {
      return res.status(400).json({ error: 'Author and quote are required' });
    }
    const newReview = new Review({ author, quote });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// POST /api/contact - Log and send email
app.post('/api/contact', async (req, res) => {
  try {
    const { senderEmail, message } = req.body;
    if (!senderEmail || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }
    
    // Save to DB
    const log = new EmailLog({ senderEmail, message, status: 'logged' });
    await log.save();

    // Send email using Nodemailer
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'jeniston777@gmail.com', // Your email where you receive messages
        subject: `New Portfolio Message from ${senderEmail}`,
        text: `You have received a new message from ${senderEmail}:\n\n${message}`
      };

      transporter.sendMail(mailOptions, async (err) => {
        if (err) {
          console.error('Error sending email:', err);
          log.status = 'failed';
          await log.save();
        } else {
          log.status = 'sent';
          await log.save();
        }
      });
    }

    res.status(201).json({ success: true, message: 'Message logged and sending initiated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log message' });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio server listening on http://localhost:${PORT}`);
});
