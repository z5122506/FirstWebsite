const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('client/build'));

const port = process.env.PORT || 8080;
// const ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
// const port = 8080;

app.get("*", (req, res) => {
    fs.readFile("index.html", (err, data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})