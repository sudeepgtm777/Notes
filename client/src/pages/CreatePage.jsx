import React, { useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import api from '../utils/axios';
import toast from 'react-hot-toast';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);
    try {
      await api.post('/notes', {
        title,
        content,
      });
      toast.success('Note Created Successfully');
      navigate('/');
    } catch (error) {
      if (error.response.status === 429) {
        toast.error('Error!! Too many attempts', {
          duration: 4000,
          icon: '❌',
        });
        console.log('Error creating note', error);
      }
      toast.error('Failed Creating Note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='max-w-2xl mx-auto'>
        <Link to={'/'} className='btn btn-ghost mb-6'>
          <ArrowLeftIcon className='size-5' />
          Back to Notes
        </Link>

        <div className='card bg-base-100'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-4'>Create New Notes</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input
                  type='text'
                  placeholder='Note Title'
                  className='input input-bordered'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea
                  placeholder='Write Your Note...'
                  className='textarea textarea-bordered h-32'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className='card-actions justify-end'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
