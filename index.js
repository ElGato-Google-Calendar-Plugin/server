#!/usr/bin/env node
require('dotenv').config()
process.on('unhandledRejection', up => { throw up })

const app = require('./app');
const port = 3000;
const http = require('http');

app.set('port', port);
const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port: ${process.env.PORT || 3000}`);
});

module.exports = {
}