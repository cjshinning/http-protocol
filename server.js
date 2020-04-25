const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    console.log(`request come, ${request.url}`);
    // response.writeHead(200,{
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers': 'X-Text-Cors',
    //     'Access-Control-Allow-Methods': 'POST, PUT, Delete',
    //     'Access-Control-Max-Age': '1000'
    // });
    // response.end('123');

    if(request.url === '/'){
        const html = fs.readFileSync('test.html', 'utf8');
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.end(html);
    }

    if(request.url === '/script.js'){
        const etag = request.headers['if-none-match'];
        if(etag === '777'){
            response.writeHead(304, {
                'Content-Type': 'text/javascript',
                'Cache-control': 'max-age=20000000, no-cache',
                'last-modified': '123',
                'Etag': '777'
            })
            response.end('');
        }else{
            response.writeHead(200, {
                'Content-Type': 'text/javascript',
                'Cache-control': 'max-age=20000000, no-store',
                'last-modified': '123',
                'Etag': '777'
            })
            response.end('console.log("script loaded loaded twice")');
        }
    }
}).listen(8888);

console.log('server listening on 8888');