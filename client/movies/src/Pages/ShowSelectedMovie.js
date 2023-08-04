import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "../Utils/Rating";
import Reviews from "../Utils/Reviews";

export default function ShowSelectedMovie() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    async function getSelectedMovieById() {
      const response = await fetch(`http://127.0.0.1:5500/api/movies/${id}`);
      const movieData = await response.json();
      setSelectedMovie(movieData);
    }
    getSelectedMovieById();
  }, []);

  return (
    <>
    {
    selectedMovie &&
      <div className="selected-movie">
        <div className="selected-movie-description" key={selectedMovie._id}>
          <h1>{selectedMovie.Title}</h1>
          <h3>{selectedMovie.Year}&nbsp;&nbsp;&nbsp;&nbsp;{selectedMovie.Runtime}</h3>
          <img src={selectedMovie.Poster}/>
          <h3>{selectedMovie.Genre}</h3>
          <h3>IMDB Rating: {selectedMovie.imdbRating}</h3>
          <h3>Director: {selectedMovie.Director}</h3>
          <h3>Actors: {selectedMovie.Actors}</h3>
        </div>
        <div className="selected-movie-ratings-reviews">
          <Rating selectedMovieRating={selectedMovie.imdbRating}/>
          <Reviews />
        </div>
      </div>
    }
    </>
  );
}
