const mongoose = require("mongoose");

const { Schema } = mongoose;

const movieSchema = new Schema({
    Title: String,
    Poster: String,
    Year: String,
    Runtime: String,
    Genre: String,
    imdbRating: String,
    Director: String,
    Actors: String
});

module.exports = mongoose.model("Movie", movieSchema);