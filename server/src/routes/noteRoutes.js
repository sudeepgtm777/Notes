import express from 'express';
import {
  updateNote,
  deleteNote,
  createNote,
  getAllNotes,
  getNote,
} from '../controllers/noteController.js';

const router = express.Router();

router.get('/', getAllNotes);
router.get('/:id', getNote);
router.post('/', createNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
