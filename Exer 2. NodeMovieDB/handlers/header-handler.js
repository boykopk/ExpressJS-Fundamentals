const url = require('url');
const fs = require('fs');
const path = require('path');
const db = require('../config/dataBase');
const errorHandler = require('./error-handler');

module.exports = (req, res) => {
    if (req.headers.statusheader === 'Full') {
    let filePath = path.normalize(path.join(__dirname, '../views/status.html'));
    fs.readFile(filePath, 'utf-8', (err, data) =>{
      if(err){
        errorHandler.notFound(err, res);
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'text/html',
      });
      let moviesCount = db.movies.getCount();
      let content = `We currently have ${moviesCount} movies in our Database!`;
      data = data.replace('{{replaceMe}}', content);
      res.write(data);
      res.end();
    });
  } else {
    return true;
  }
}