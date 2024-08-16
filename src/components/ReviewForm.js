import React, { useState, useEffect } from 'react';
import '../styles/ReviewForm.css'
function ReviewForm({ review = {}, onSubmit, onDelete, mode = 'add' }) {
  const [text, setText] = useState(review.text || '');
  const [rating, setRating] = useState(review.rating || '');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (review && mode === 'edit') {
      setText(review.text || '');
      setRating(review.rating || '');
    }
  }, [review, mode]);

  const validate = () => {
    const errors = {};
    if (!text) errors.text = 'Review text is required.';
    if (!rating || rating < 1 || rating > 5) errors.rating = 'Rating must be between 1 and 5.';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      if (mode === 'edit' && review) {
        onSubmit({ ...review, text, rating });
      } else {
        onSubmit({ text, rating });
      }
      setText('');
      setRating('');
      setSubmitted(true);
    } else {
      setErrors(errors);
    }
  };

  const handleDelete = () => {
    if (review && window.confirm('Are you sure you want to delete this review?')) {
      onDelete(review.id);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="review-form">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your review"
        />
        {errors.text && <p className="error">{errors.text}</p>}
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          placeholder="Rating (1-5)"
        />
        {errors.rating && <p className="error">{errors.rating}</p>}
        <button type="submit">{mode === 'edit' ? 'Update Review' : 'Submit Review'}</button>
        {mode === 'edit' && (
          <button type="button" onClick={handleDelete} className="delete-button">Delete Review</button>
        )}
      </form>
      {submitted && <p className="thank-you-message">Thank you for your review!</p>}
    </div>
  );
}

export default ReviewForm;
