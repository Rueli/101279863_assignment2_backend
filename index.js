const http = require('http');
const app = require('./src/app.js');

const server = http.createServer(app);

const PORT = process.env.PORT || 9090;

server.listen(PORT, function () {
    console.log("Server listening on " + PORT);
});
