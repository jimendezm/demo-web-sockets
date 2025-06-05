import express from 'express';
import http from 'http';
import { Server as SocketServer} from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('message', (data) => {
    socket.broadcast.emit('message', data);
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});