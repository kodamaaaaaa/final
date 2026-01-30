const fs = require('fs');
const http = require('http');
http.createServer((req,res) => {
    if(req.method === 'GET') {
        res.end(fs.readFileSync('〇〇.html'));
        return;
    }

    if(req.method === 'POST' && req.url === '/signup'){
        let body = '';
        req.on('data', c => body += c);
        req.on('end',() => {
            const{id,pw} = JSON.parse(body)
            fs.appendFileSync('users.csv',`\n${id},${pw}`)
            res.end();
        });
    }

}).listen(3000);