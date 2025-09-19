export const getAllNotes = (req, res) => {
  res.status(200).send('hello');
};

export const createNote = (req, res) => {
  res.status(200).json({ message: 'Note created sucessfully' });
};

export const updateNote = (req, res) => {
  res.status(200).json({ message: 'Note created sucessfully' });
};

export const deleteNote = (req, res) => {
  res.status(200).json({ message: 'Note created sucessfully' });
};
