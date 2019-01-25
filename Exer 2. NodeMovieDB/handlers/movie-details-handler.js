const url = require('url');
const fs = require('fs');
const path = require('path');
const errorHandler = require('./error-handler')
const db = require('../config/dataBase')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname;

  if(req.pathname.startsWith('/movies/details') && req.method === 'GET'){
    let filePath = path.normalize(path.join(__dirname, '../views/details.html'));
    fs.readFile(filePath, 'utf-8', (err, data) =>{
      if(err){
        errorHandler.notFound(err, res);
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'text/html',
      });

      let movieIndex = Number(req.pathname.split('/')[3]);
      let currentMovie = db[movieIndex];
      let decodeURL = decodeURIComponent(currentMovie.moviePoster.toString());
      let decodeDescription = decodeURIComponent(currentMovie.movieDescription.toString()).replace(/\+/g, ' ');
      let decodeTitle = decodeURIComponent(currentMovie.movieTitle.toString()).replace(/\+/g, ' ');

      let movieDetail = `<div class="content">
                          <img src="${decodeURL}" alt=""/>
                          <h3>Title  ${decodeTitle}</h3>
                          <h3>Year ${currentMovie.movieYear}</h3>
                          <p> ${decodeDescription}</p>
                        </div>`;

      data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', movieDetail);

      res.write(data);
      res.end();

    });

  } else {
    return true;
  }
}