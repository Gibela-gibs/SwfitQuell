const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configure CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Add the origins of your client apps
  methods: ['GET', 'POST'],
  credentials: true, // Allow credentials if needed
}));

const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Add the origins of your client apps
    methods: ['GET', 'POST'],
    credentials: true, // Allow credentials if needed
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('ride:request', (data) => {
    console.log('Ride request received:', data);
    io.emit('ride:request', data);
  });

  socket.on('ride:accept', (data) => {
    console.log('Driver accepted ride request:', data);
    io.emit('ride:accepted', data);
  });
});

const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
