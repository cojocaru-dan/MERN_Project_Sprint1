import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function HomePage() {
  const [allMovies, setAllMovies] = useState(null);
  const [actualMovies, setActualMovies] = useState(null);
  const navigate = useNavigate();

  // get movies from the database
  useEffect(() => {
    async function getMoviesFromServer() {
      const response = await fetch("http://127.0.0.1:5500/api/movies");
      const moviesData = await response.json();
      setAllMovies(moviesData);
      setActualMovies(moviesData);
    }
    setTimeout(() => getMoviesFromServer(), 600);
  }, []);

  function handleDelete(id) {
    fetch(`http://127.0.0.1:5500/api/movies/${id}`, { method: "DELETE" })
      .then((res) => res.json());

    setAllMovies((allMovies) => allMovies.filter((movie) => movie._id !== id));
    setActualMovies((actualMovies) => actualMovies.filter((movie) => movie._id !== id));
  }

  function handleSearch(event) {
    setActualMovies(allMovies.filter(movie => movie.Title.toLowerCase().includes(event.target.value.toLowerCase())));
  }

  return (
    <>
      <input className="search" placeholder="Search by Title.." onChange={handleSearch}/>
      <ul className="movies">
        {actualMovies && actualMovies.map(movie => 
          (<li className="movie-description" key={movie._id}>
            <div onClick={() => navigate(`/movie/${movie._id}`)}>
              <h1>{movie.Title}</h1>
              <h3>{movie.Year}&nbsp;&nbsp;&nbsp;&nbsp;{movie.Runtime}</h3>
              <img src={movie.Poster}/>
              <h3>{movie.Genre}</h3>
              <h3>IMDB Rating: {movie.imdbRating}</h3>
              <h3>Director: {movie.Director}</h3>
              <h3>Actors: {movie.Actors}</h3>
            </div>
            <Link to={`update/${movie._id}`}>
              <button>Update Movie</button>
            </Link>
            <button onClick={() => {handleDelete(movie._id)}}>Delete Movie</button>
          </li>)
        )}
      </ul>
    </>
  );
}
