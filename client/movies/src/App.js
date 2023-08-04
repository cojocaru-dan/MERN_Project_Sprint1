import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import UpdatePage from './Pages/UpdatePage';
import ShowSelectedMovie from './Pages/ShowSelectedMovie';
import movieTitles from "./movieTitles.json";
import storeMovies from './Utils/storeMovies';

function App() {
  const [movies, setMovies] = useState(null);
  
  // fetch movies from API server
  useEffect(() => {
    let fetchedMovies = [];
    Promise
      .all(movieTitles.map(movieTitle => 
        fetch(`http://www.omdbapi.com/?t=${movieTitle}&apikey=2374a31f`)
          .then(res => res.json())
      ))
      .then(fetchedMovies => setMovies(fetchedMovies))
  }, [])

  // store movies to database
  if (movies) {
    storeMovies(movies);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
        <Route path="/movie/:id" element={<ShowSelectedMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
