import React from 'react';
import { Link } from 'react-router';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import api from '../utils/axios';
import { formatDate } from '../utils/utils';
import toast from 'react-hot-toast';

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm('Do you want to delete the note!!!')) return;

    try {
      await api.delete(`/notes/${id}`);

      // This deletes the one from the set of Notes
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success('Note deleted successfully!!!');
    } catch (error) {
      toast.error('Failed to delete the note');
    }
  };
  return (
    <Link
      to={`/notes/${note._id}`}
      className='card bg-base-200 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#fffff]'
    >
      <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'></div>
        <span className='text-sm text-base-content/60'>
          {formatDate(new Date(note.createdAt))}
        </span>
        <div className='flex items-center gap-1'>
          <PenSquareIcon className='size-4' />
          <button
            className='btn btn-ghost btn-xs text-error'
            onClick={(e) => handleDelete(e, note._id)}
          >
            <Trash2Icon className='size-4' />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
