const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

http.createServer((request, response) => {
    console.log(`request come, ${request.headers.host}`);

    const html = fs.readFileSync('test.html', 'utf8');
    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Encoding': 'gzip'
    })
    response.end(zlib.gzipSync(html));

}).listen(8888);

console.log('server listening on 8888');