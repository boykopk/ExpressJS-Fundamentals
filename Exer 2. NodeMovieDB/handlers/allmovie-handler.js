const url = require('url');
const fs = require('fs');
const path = require('path');
const errorHandler = require('./error-handler');
const db = require('../config/dataBase');

db.sort((a, b) => {
  return a.movieYear - b.movieYear;
});

module.exports = (req, res) => {
  req.pathName = req.pathname || url.parse(req.url).pathname;

  if(req.pathName === '/viewAllMovies' && req.method === 'GET'){
    let filePath = path.normalize(path.join(__dirname, '../views/viewAll.html'));
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if(err){
        errorHandler.notFound(err, res);
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'text/html',
      });

      let movieList = '';

      for (let i = 0; i < db.length; i++) {
        let movieUrl = db[i].moviePoster;
        let decode = decodeURIComponent(movieUrl.toString());
        movieList += `<a href="/movies/details/${i}">
                        <div class="movie">
                        <img class="moviePoster" src="${decode}"/>
                        </div>
                     </a>`;
      }

      data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', movieList);
      res.write(data);
      res.end();
    });
  } else {
    return true;
  }
}