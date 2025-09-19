import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A note should have title'],
    },
    content: {
      type: String,
      required: [true, 'A note should have content'],
    },
  },
  // Used for CreatedAt, UpdatedAt
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;
