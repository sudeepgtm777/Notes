import express from 'express';
import noteRoutes from './routes/noteRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();

app.use('/api/notes', noteRoutes);

dotenv.config({ path: './src/config.env' });

// Build DB string
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
