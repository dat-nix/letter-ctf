const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.ttf': 'font/ttf'
};

const oldMap = Buffer.from('/archive/forgotten/').toString('base64');

const errorPage = `<!doctype html>
<html><head><meta charset="utf-8"><title>the envelope is confused</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#d9dccf;color:#543d35;font:16px 'Courier New',monospace}main{width:min(560px,calc(100% - 36px));padding:28px;background:#fff8df;border:3px ridge #c99172;box-shadow:7px 7px #8d5b4d}h1{color:#8a216e;font-size:22px}code{color:#6d2f73}</style></head>
<body><main><h1>409: the envelope is not ready</h1><p>this old route answers in the margins. inspect the response headers before trying another door.</p><p><code>the page is not the whole page.</code></p></main></body></html>`;

function sendFile(res, pathname) {
  const relative = pathname === '/' ? '/index.html' : pathname;
  let file = path.resolve(root, `.${relative}`);
  if (!file.startsWith(root + path.sep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('no wandering outside the little homepage.');
    return;
  }
  fs.stat(file, (error, stat) => {
    if (!error && stat.isDirectory()) file = path.join(file, 'index.html');
    fs.stat(file, (nestedError, nestedStat) => {
    if (nestedError || !nestedStat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404</h1><p>this page wandered off.</p>');
      return;
    }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
    });
  });
}

http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/letter/open') {
    if (req.method === 'OPTIONS' || req.method === 'HEAD') {
      res.writeHead(204, {
        'Allow': 'OPTIONS, HEAD',
        'Cache-Control': 'no-store',
        'X-Old-Web-Map': oldMap,
      'X-Envelope-Note': 'the-response-has-a-hidden-margin',
      'X-Envelope-Hint': 'read-the-allow-header'
      });
      res.end();
      return;
    }
    res.writeHead(405, {
      'Content-Type': 'text/html; charset=utf-8',
      'Allow': 'OPTIONS, HEAD',
      'Cache-Control': 'no-store',
      'X-Envelope-Note': 'the-response-has-a-hidden-margin',
      'X-Envelope-Hint': 'read-the-allow-header'
    });
    res.end(errorPage);
    return;
  }
  sendFile(res, decodeURIComponent(url.pathname));
}).listen(port, () => {
  console.log(`cozy letter server running at http://localhost:${port}`);
});
