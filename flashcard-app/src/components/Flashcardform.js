import { useState, useEffect } from 'react';
import { useFlashcards } from '../Context/FlashcardContext';

const FlashcardForm = ({ flashcard = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    difficulty: 'easy'
  });

  useEffect(() => {
    if (flashcard) {
      setFormData({
        question: flashcard.question || '',
        answer: flashcard.answer || '',
        category: flashcard.category || '',
        difficulty: flashcard.difficulty || 'easy'
      });
    }
  }, [flashcard]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.question.trim() || !formData.answer.trim()) {
      alert('Please fill in both question and answer fields');
      return;
    }

    onSave(formData);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5>{flashcard ? 'Edit Flashcard' : 'Add New Flashcard'}</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="question" className="form-label">Question</label>
            <textarea
              className="form-control"
              id="question"
              name="question"
              rows="3"
              value={formData.question}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="answer" className="form-label">Answer</label>
            <textarea
              className="form-control"
              id="answer"
              name="answer"
              rows="3"
              value={formData.answer}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Math, Science, History"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="difficulty" className="form-label">Difficulty</label>
            <select
              className="form-select"
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              {flashcard ? 'Update' : 'Add'} Flashcard
            </button>
            {onCancel && (
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlashcardForm;
