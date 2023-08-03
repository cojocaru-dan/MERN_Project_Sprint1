export default function UpdateMovie(movie) {
  return fetch(`http://127.0.0.1:5500/api/movies/${movie._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  })
		.then((res) => res.json());
}
