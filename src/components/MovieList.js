// src/components/MovieList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieList.css'; // Import the CSS file for styling

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an array of movie IDs or titles to fetch
    const movieIds = [
      "tt0111161",
      "tt0068646",
      "tt0068413",
      "tt0066357",
      "tt1164546",
      "tt0068686",
      "tt0068146",
      "tt0000640",
      "tt0068606",
      "tt0068646"
      // Add more movie IDs here...
    ];

    const fetchMovies = async () => {
      try {
        const responses = await Promise.all(movieIds.map(id =>
          fetch(`http://www.omdbapi.com/?i=${id}&apikey=24ddc532`)
        ));
        const data = await Promise.all(responses.map(response => response.json()));

        const moviesData = data.filter(movie => movie.Response === 'True');
        setMovies(moviesData);
      } catch (error) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-list">
      <center><h1 >Movie List</h1></center>
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <ul>
          {movies.map(movie => (
            <li key={movie.imdbID} className="movie-item">
              <h2>{movie.Title}</h2>
              <img src={movie.Poster} alt={movie.Title} className="movie-poster border border-5" />
              <p><strong>Genre:</strong> {movie.Genre}</p>
              <p><strong>Rating:</strong> {movie.imdbRating}</p>
              
              <Link to={`/movie/${movie.imdbID}`}>Reviews</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;
