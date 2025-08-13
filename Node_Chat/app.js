    const express = require('express');
    const app = express();
    const http = require('http').createServer(app);
    const io = require('socket.io')(http); // Initialize Socket.IO with the HTTP server

    // Serve static files (e.g., index.html)
    app.use(express.static(__dirname + '/public')); // Assuming public folder for client-side files

    // Handle root route
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });

    // Start the server
    const PORT = process.env.PORT || 3000;
    http.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
        io.on('connection', (socket) => {
        console.log('A user connected');

        // Listen for chat messages from clients
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            io.emit('chat message', msg); // Broadcast the message to all connected clients
        });

        // Handle disconnects
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });