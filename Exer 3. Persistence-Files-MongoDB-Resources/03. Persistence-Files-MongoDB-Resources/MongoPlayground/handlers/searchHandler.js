let url = require('url');
let Image = require('../models/ImageSchema');
let Tag = require('../models/TagSchema');

module.exports = (req, res) => {
  if (req.pathname === '/search') {
    let url_parts = url.parse(req.url, true);
    let params = url_parts.query;
    let searchObj = {};
    let dateCheck = {};

    if (params.afterDate) {
      dateCheck['$gte'] = params.afterDate;
    }

    if (params.beforeDate) {
      dateCheck['$lte'] = params.beforeDate;
    }

    if (Object.entries(dateCheck).length !== 0) {
      searchObj.creationDate = dateCheck;
    }

    let query;

    if (params.tagName) {
      Tag.findOne({ name: params.tagName })
        .then(tag => {
          searchObj['tag._id'] = tag._id
          console.log(searchObj.tag);
          query = Image.find(searchObj);
          query.limit(parseInt(params.Limit, 10)).exec((err, image) => {
            console.log(image.length);
          })
        })

    } else {
      query = Image.find(searchObj);
      query.limit(parseInt(params.Limit, 10)).exec((err, image) => {
        console.log(image.length);
      })
    }
    res.end();
  } else {
    return true;
  }
};