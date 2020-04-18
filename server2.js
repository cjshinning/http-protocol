const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    console.log(`request come ${request.url}`);
    let html = fs.readFileSync('./test.html', 'utf8');
    response.end(html);
}).listen(8887);

console.log('server listening on 8887');