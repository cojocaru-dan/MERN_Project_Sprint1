import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DisplayProperty from "../Utils/DisplayProperty";
import UpdateMovie from "../Utils/UpdateMovie";

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieObject, setMovieObject] = useState(null);
  const [title, setTitle] = useState(null);
  const [poster, setPoster] = useState(null);
  const [year, setYear] = useState(null);
  const [runtime, setRuntime] = useState(null);
  const [genre, setGenre] = useState(null);
  const [imdbRating, setImdbRating] = useState(null);
  const [director, setDirector] = useState(null);
  const [actors, setActors] = useState(null);

  // get selected movie data
  useEffect(() => {
    async function fetchMovieById() {
      const response = await fetch(`http://127.0.0.1:5500/api/movies/${id}`);
      const movieData = await response.json();
      setMovieObject(movieData);
      setTitle(movieData.Title);
      setPoster(movieData.Poster);
      setYear(movieData.Year);
      setRuntime(movieData.Runtime);
      setGenre(movieData.Genre);
      setImdbRating(movieData.imdbRating);
      setDirector(movieData.Director);
      setActors(movieData.Actors);
    }
    fetchMovieById()
  }, [id])

  function submitForm(e) {
    e.preventDefault();
    const newlyCreatedMovie = {
      ...movieObject,
      Title: title, 
      Poster: poster,
      Year: year,
      Runtime: runtime,
      Genre: genre, 
      imdbRating: imdbRating,
      Director: director,
      Actors: actors,
    };
    console.log("updatedmovie", newlyCreatedMovie);
    UpdateMovie(newlyCreatedMovie)
      .then(() => navigate("/"));
  }

  return (
    <form className="update-page" onSubmit={submitForm}>
      <h2>Update Movie</h2>
      <DisplayProperty propName="Title" propVal={title} setPropVal={setTitle}/>
      <DisplayProperty  propName="Poster" propVal={poster} setPropVal={setPoster}/>
      <DisplayProperty  propName="Year" propVal={year} setPropVal={setYear}/>
      <DisplayProperty  propName="Runtime" propVal={runtime} setPropVal={setRuntime}/>
      <DisplayProperty  propName="Genre" propVal={genre} setPropVal={setGenre}/>
      <DisplayProperty  propName="imdbRating" propVal={imdbRating} setPropVal={setImdbRating}/>
      <DisplayProperty  propName="Director" propVal={director} setPropVal={setDirector}/>
      <DisplayProperty  propName="Actors" propVal={actors} setPropVal={setActors}/>
      <button type="submit">Update Movie</button>
    </form>
  );
}
