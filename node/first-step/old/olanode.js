var http = require('http');
http.createServer(function (req, res) {
    setTimeout(function(){
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Olá mundo!');
    },3000);
}).listen(3000);
console.log('Servidor iniciado em localhost:3000. Ctrl+C para encerrar…');