const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(__dirname, reqPath);

  // Set anti-cache headers so browser always loads latest edits
  const headers = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store',
    'Access-Control-Allow-Origin': '*'
  };

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    headers['Content-Type'] = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain', ...headers });
    res.end('404 Not Found: ' + reqPath);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n=================================================`);
  console.log(`TEAM DAP Live Server listening at http://localhost:${PORT}`);
  console.log(`=================================================\n`);
});
