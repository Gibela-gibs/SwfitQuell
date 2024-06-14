const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow both rider and driver app origins
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('ride:request', (data) => {
    console.log('Ride request received:', data);
    io.emit('ride:request', data); // Emit to all connected drivers
  });

  socket.on('ride:accept', (data) => {
    console.log('Driver accepted ride request:', data);
    io.emit('ride:accepted', data); // Emit to the rider
  });

  socket.on('ride:decline', (data) => {
    console.log('Driver declined ride request:', data);
    io.emit('ride:declined', data); // Emit to the rider
  });
});

const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});