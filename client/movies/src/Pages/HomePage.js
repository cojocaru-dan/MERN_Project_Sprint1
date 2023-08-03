import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function HomePage() {
  const [getMovies, setGetMovies] = useState(null);

  // get movies from the database
  useEffect(() => {
    async function getMoviesFromServer() {
      const response = await fetch("http://127.0.0.1:5500/api/movies");
      const moviesData = await response.json();
      setGetMovies(moviesData);
    }
    setTimeout(() => getMoviesFromServer(), 600);
  }, []);

  function handleDelete(id) {
    fetch(`http://127.0.0.1:5500/api/movies/${id}`, { method: "DELETE" })
      .then((res) => res.json());

    setGetMovies((getMovies) => getMovies.filter((movie) => movie._id !== id));
  }

  return (
    <ul className="movies">
      {getMovies && getMovies.map(movie => 
        (<li className="movie-description" key={movie._id}>
          <h1>{movie.Title}</h1>
          <h3>{movie.Year}&nbsp;&nbsp;&nbsp;&nbsp;{movie.Runtime}</h3>
          <img src={movie.Poster}/>
          <h3>{movie.Genre}</h3>
          <h3>IMDB Rating: {movie.imdbRating}</h3>
          <h3>Director: {movie.Director}</h3>
          <h3>Actors: {movie.Actors}</h3>
          <Link to={`update/${movie._id}`}>
            <button>Update Movie</button>
          </Link>
          <button onClick={() => {handleDelete(movie._id)}}>Delete Movie</button>
          <br/>
          <br/>
        </li>)
      )}
    </ul>
  );
}
