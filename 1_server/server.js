const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    if(req.url === "/"){
        res.writeHead(200, {'Content-Type' : 'text/html'});
        let html = fs.readFileSync(`${__dirname}/index.html`);
        res.end(html)

    } else if(req.url === "/api/user"){
        res.writeHead(200, {'Content-Type' : 'application/json'});
        const names = ["Adam", "Maciek", "Renata"];
        const cars = {
            name:"Ford", 
            model:"Fiesta"
        }
        const json = JSON.stringify({
            names,
            cars
        })
        res.end(json.toString());
    } else {
        res.writeHead(404);
        res.end;
    }
})
server.listen(8080, 'localhost');

console.log('server is starting')
// console.log(__dirname)
