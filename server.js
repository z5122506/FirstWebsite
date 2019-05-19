// const http = require('http');
// const fs = require('fs');
// const process = require('process')

// console.log(process.argv);
// // let hostname = "127.0.0.1";
// if (process.argv.length > 2) {
//     hostname = "127.0.0.1";
// } else {
//     // TODO: Set this to dynamic host names
//     hostname = "10.0.0.11";
// }
// const port = 25565;

// const server = http.createServer((req, res) => {
//     fs.readFile("index.html", (err, data) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/html');
//         res.end(data);
//     });
// });

// server.listen(port, hostname, () => {
//     console.log("Server running at http://" + hostname + ":" + port + "/");
// });

const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));

const port = process.env.PORT || 8080;
// const ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
// const port = 8080;

app.get("/", (req, res) => {
    fs.readFile("index.html", (err, data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})