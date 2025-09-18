const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('hello');
});

router.post('/', (req, res) => {
  res.status(200).send('hello');
});

router.patch('/:id', (req, res) => {
  res.status(200).json({ message: 'Note updated sucessfully' });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'Note deleted sucessfully' });
});

module.exports = router;
