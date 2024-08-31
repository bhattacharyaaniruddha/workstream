require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./app/utils/db.js');
const todoRoutes = require('./app/routes/todoRoutes.js');
const userRoutes = require('./app/routes/userRoutes.js');
const cors = require('cors')
const socketIo = require('socket.io');
const http = require('http');
const { setSocketIO } = require('./app/utils/socket.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set the Socket.IO instance
setSocketIO(io);

io.on('connection', (socket) => {
  console.log('New client connected');
});

app.use(cors())

app.use(bodyParser.json());

app.use('/', todoRoutes);
app.use('/', userRoutes);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
