const fs = require('fs');
const url = require('url');
const qs = require('querystring');
let db = require('../db/db');
const fileReader = require('filereader')
const shortid = require('shortid');
var formidable = require('formidable');
const viewAllPath = './views/viewAll.html'
const addMemePath = './views/addMeme.html'
const detailsPath = './views/details.html'

function viewAll(req, res) {
  fs.readFile(viewAllPath, 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    res.writeHead(200, {
      'Content-Type': 'text/html'
    })

    let replacant = '<div id="replaceMe">{{replaceMe}}</div>';
    let replacement = '';

    db = db.sort((a, b) => {
      return b.dateStamp - a.dateStamp
    })

    for (let meme of db) {
      if (meme.privacy === 'on') {
        replacement += `<div class="meme">
            <a href="/getDetails?id=${meme.id}">
            <img class="memePoster" src="${meme.memeSrc}"/>
              </div>`
      }

    }

    data = data.replace(replacant, replacement);

    res.end(data)
  })
}

function getDetails(req, res) {
  fs.readFile(detailsPath, 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    res.writeHead(200, {
      'Content-Type': 'text/html'
    })

    let replacant = '<div id="replaceMe">{{replaceMe}}</div>';
    let replacement = '';

    let id = qs.parse(url.parse(req.url).query).id;

    for (let meme of db) {
      if (meme.id === id) {
        replacement += `<div class="content">
          <img src="${meme.memeSrc}" alt=""/>
          <h3>Title ${meme.title}</h3>
          <p> ${meme.description}</p>
          </div>`

        break;
      }
    }

    data = data.replace(replacant, replacement);

    res.end(data)
  })
}

function viewAddMeme(req, res) {
  fs.readFile(addMemePath, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'text/html'
    })

    res.end(data);

  })
}

function addMeme(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err);
      return;
    }


    let id = shortid.generate();
    let fileName = `./public/memeStorage/${id}.jpg`;
    /* Temporary location of our uploaded file */
    var temp_path = files['meme'].path;

    meme = {
      "id": id,
      "title": fields.memeTitle,
      "memeSrc": fileName,
      "description": fields.description,
      "privacy": fields.status,
      "dateStamp": + new Date()
    }

    fs.copyFile(temp_path, fileName, function (err) {
      if (err) {
        console.error(err);
        return;
      }
    });

    db.push(meme);
    viewAll(req, res);
    return;

  });
}

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else if (req.pathname.startsWith('public/memeStorage') && req.method === 'GET') {
    console.log('HERE')
  }
  else {
    return true
  }
}