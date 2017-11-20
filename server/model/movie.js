const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: String,
    poster: String,
    releaseDate: Date
});

module.exports = mongoose.model('Movie',movieSchema);


