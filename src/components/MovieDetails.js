// src/components/MovieDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import '../styles/MovieDetails.css'; // Adjust path if needed

function MovieDetail() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([
    { id: 1, text: 'Great movie! Loved the action scenes.', rating: 5 },
    { id: 2, text: 'Not bad, but could use more character development.', rating: 3 },
  ]);
  const [currentReview, setCurrentReview] = useState(null);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=24ddc532`)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          console.error('Error fetching movie details:', data.Error);
          setMovie(null);
        }
      })
      .catch(error => console.error('Error fetching movie details:', error));
  }, [id]);

  const handleReviewSubmit = (review) => {
    if (currentReview) {
      setReviews(reviews.map(r => (r.id === review.id ? review : r)));
    } else {
      setReviews([...reviews, { ...review, id: Date.now() }]);
    }
    setCurrentReview(null);
  };

  const handleReviewEdit = (review) => {
    setCurrentReview(review);
  };

  const handleReviewDelete = (reviewId) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail">
      <h1 className='satisfy-regular'>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} className="movie-poster-detail" />
      <p>{movie.Plot}</p>
      <p><strong>Rating:</strong> {movie.imdbRating}</p>
      <ReviewForm 
        review={currentReview || {}}
        onSubmit={handleReviewSubmit}
        onDelete={handleReviewDelete}
        mode={currentReview ? 'edit' : 'add'}
        reviews={reviews}
      />
      <h2>Reviews:</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.text} - {review.rating} stars</p>
            <button type='button'  className=' btn btn-dark' onClick={() => handleReviewEdit(review)}>Edit</button>
            <button type='button'  className=' btn btn-dark' onClick={() => handleReviewDelete(review.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetail;
