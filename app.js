const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 8001

io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('join', (data) => {
        const { conversationId, userId } = data;

        // Join room based on conversation ID
        socket.join(conversationId);
        console.log(`User ${userId} joined conversation ${conversationId}`);
    });
  
    socket.on('typing', (data) => {
        const { conversationId, userId, isTyping } = data;
        
        // Broadcast typing event to all users in the conversation except the sender
        socket.to(conversationId).emit('typing', { userId, isTyping });
        console.log(`User ${userId} is typing in conversation ${conversationId}`);
    });
  
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
  });

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});