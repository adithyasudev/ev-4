// index.js or app.js
const mongoose = require('./db/mongooseConnection');// Import your MongoDB URI from configuration

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const logRoutes = require('./routes/logRoutes'); // Ensure this matches the exact file name
const { log } = require('console');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.get('/', function (req, res) {

res.send("homepage")

});
io.on('connection', (socket) => {
    log('Client connected', 'info');
    socket.on('disconnect', () => {
        log('Client disconnected', 'info');
    });
});


app.use('/logs', logRoutes);

server.listen(3000, () => {
    log('Server is running on port 3000', 'info'); // Corrected the port number here as well
});
