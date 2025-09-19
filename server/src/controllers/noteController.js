import Note from '../models/noteModel.js';

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json({
      status: 'success',
      results: notes.length,
      data: { notes },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Note not found' });
    }
    res.status(200).json({ status: 'success', data: { note } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json({ status: 'success', data: { note } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Note not found' });
    }

    res.status(200).json({ status: 'success', data: { note } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Note not found' });
    }

    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
