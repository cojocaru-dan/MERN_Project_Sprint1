require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoMovieModel = require("./mongoMovieModel");

const { mongoUrl } = process.env;
const port = 5500;

if (!mongoUrl) {
  console.error("Missing mongo URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/movies", async (req, res) => {
  const moviesData = await mongoMovieModel.find().sort({imdbRating: "desc"});
  return res.json(moviesData);
});

app.get("/api/movies/:id", async (req, res) => {
  const movieData = await mongoMovieModel.findById(`${req.params.id}`);
  return res.json(movieData);
});

app.post("/api/movies", async (req, res) => {
  const deleteobj = await mongoMovieModel.deleteMany({});
  console.log(deleteobj);

  const movieSchemaObjects = req.body.map(movie => ({
    Title: movie.Title,
    Poster: movie.Poster,
    Year: movie.Year,
    Runtime: movie.Runtime,
    Genre: movie.Genre,
    imdbRating: movie.imdbRating,
    Director: movie.Director,
    Actors: movie.Actors
  }));

  await mongoMovieModel.create(...movieSchemaObjects);
  console.log("Movies stored");
});

app.patch("/api/movies/:id", async (req, res) => {
  const movie = await mongoMovieModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { ...req.body } },
    { new: true }
  );
  return res.json(movie);
});

app.delete("/api/movies/:id", async (req, res) => {
    const deletedMovie = await mongoMovieModel.findByIdAndDelete(req.params.id);
    return res.json(deletedMovie);
});

function main() {
  mongoose.connect(mongoUrl)
    .then(() => console.log("Connected on Mongo DB"))
    .catch(() => console.log("Connection on Mongo DB was failed!"))

  app.listen(port, () => {
    console.log("App is listening on 5500");
  });
}

main();
