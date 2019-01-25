const http = require('http');
const url = require('url');
const handlers = require('./handlers/index');

const port = process.env.PORT || 3000;

http.createServer((req, res) => {
  req.pathname = url.parse(req.url).pathname;
  for (let handler of handlers) {
      let result = handler(req, res);
      if (!result) {
          break;
      }
  }
}).listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
