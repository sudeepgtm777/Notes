import express from 'express';
import { getAllNotes } from '../controllers/noteController.js';

const router = express.Router();

router.get('/', getAllNotes);

router.post('/', (req, res) => {
  res.status(200).send('hello');
});

router.patch('/:id', (req, res) => {
  res.status(200).json({ message: 'Note updated sucessfully' });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'Note deleted sucessfully' });
});

export default router;
