// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetails';
import Navbar from './components/NavBar'; // Assuming you have a Navbar component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
