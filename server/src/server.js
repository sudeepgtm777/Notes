import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import noteRoutes from './routes/noteRoutes.js';

import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });
const app = express();

// Rate Limit middleware 15 min max 100 request
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2,
  message: 'Too many requests, try again later.',
});
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());
app.use(limiter);

app.use('/api/notes', noteRoutes);

const DB = process.env.DATABASE;

async function startServer() {
  try {
    await mongoose.connect(DB);
    console.log('✅ Successfully connected to MongoDB');

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}...`);
    });
  } catch (error) {
    console.error('❌ DB connection error:', error);
    process.exit(1);
  }
}

startServer();
