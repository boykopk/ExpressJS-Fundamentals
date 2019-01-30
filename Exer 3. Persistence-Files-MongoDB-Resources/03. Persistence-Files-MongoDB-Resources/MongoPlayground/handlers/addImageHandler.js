const url = require('url');
const qs = require('querystring');
const Image = require('../models/ImageSchema');

function addImage(req, res) {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    let tagFields = qs.parse(body);
    tagFields.tagsID = tagFields.tagsID.split(',');
    tagFields.tagsID.pop();

    console.log(tagFields.tagsID);
    if (!tagFields.imageUrl || !tagFields.imageTitle) {
      console.log("Missing parameters in the POST.");
      return;
    } else {
      let newImage = new Image({
        URL: tagFields.imageUrl,
        title: tagFields.imageTitle,
        description: tagFields.description,
        tags: tagFields.tagsID
      });

      console.log(newImage);
      newImage.save();
    }

    res.writeHead(302, {
      'Location': '/'
    });
    res.end();
  });
}

function deleteImg(req, res) {
  let url_parts = url.parse(req.url, true);
  let params = qs.parse(url_parts.query);
  let id = params.id;

  Student.findByIdAndRemove(id);

  res.writeHead(302, {
    'Location': '/'
  });
  res.end();
}

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res);
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res);
  } else {
    return true;
  }
};