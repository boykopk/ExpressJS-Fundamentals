const url = require('url');
const qs = require('querystring');
const Tag = require('../models/TagSchema')

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
      let tagFields = qs.parse(body);

      if(!tagFields.tagName){
        return;
      }

      let newTag = new Tag({name: tagFields.tagName});
      console.log(newTag);
      newTag.save();

      res.writeHead(302, {
        'Location': '/'
      });
      res.end();
   });
  } else {
    return true
  }
}