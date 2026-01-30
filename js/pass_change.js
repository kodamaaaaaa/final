const fs = require('fs');
const http = require('http');
http.createServer((req,res) => {
    if(req.method === 'GET') {
        res.end(fs.readFileSync('〇〇.html'));
        return;
    }

    if(req.method === 'POST'){
        let body = '';
        req.on('data', c => body += c);
        req.on('end',() => {
            const {id,pw} = JSON.parse(body);
            const pass = fs.readFileSync('users.csv','utf-8').trim().split('\n').map(l => l.split(','));
            for(let u of pass){
                if(u[0] === id){
                    u[1] = pw;
                }
            }

        fs.writeFileSync(
            'users.csv',
            pass.map(u => u.join(',')).join('\n')
        );
        res.end();
     });
   }
}).listen(3000);