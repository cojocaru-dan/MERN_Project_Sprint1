let moviesStoredSuccesfully = false;

function storeMovies(movies) {
  if (!moviesStoredSuccesfully) {
    fetch("http://127.0.0.1:5500/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movies),
    }).then((res) => res.json());
    moviesStoredSuccesfully = true;
  } 
}

export default storeMovies;