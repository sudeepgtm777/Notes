import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Note from './src/models/noteModel.js';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: './config.env' });

// Connect to MongoDB
const DB = process.env.DATABASE;
if (!DB) {
  console.error('❌ DATABASE environment variable is missing!');
  process.exit(1);
}

mongoose
  .connect(DB) // no need for deprecated options
  .then(() => console.log('✅ Successfully connected to MongoDB'))
  .catch((err) => {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  });

// Read notes.json file
const notes = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'notes.json'), 'utf-8')
);

// Import data into DB
const importData = async () => {
  try {
    await Note.create(notes);
    console.log('✅ Notes successfully loaded into DB');
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// Delete all notes from DB
const deleteData = async () => {
  try {
    await Note.deleteMany();
    console.log('✅ Notes successfully deleted from DB');
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// CLI commands: --import or --delete
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Use "--import" to load data or "--delete" to remove data');
  process.exit();
}
