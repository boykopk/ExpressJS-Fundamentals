const headerHandler = require('./header-handler');
const homeHandler = require('./home-handler');
const staticHandler = require('./static-handler');
const addMovieHandler = require('./addmovie-handler');
const allMovieHandler = require('./allmovie-handler');
const movieDetailsHandler = require('./movie-details-handler');

module.exports = [headerHandler, homeHandler, staticHandler, addMovieHandler, allMovieHandler, movieDetailsHandler];