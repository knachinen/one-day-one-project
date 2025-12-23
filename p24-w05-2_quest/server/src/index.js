require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    message: 'Quest MVP Server is running!'
  });
});

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const db = require('./utils/db');
    const result = await db.query('SELECT name FROM sqlite_master WHERE type="table"');
    res.json({
      status: 'ok',
      tables: result.map(r => r.name)
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Routes
app.use('/api/squads', require('./routes/squads'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/sessions', require('./routes/sessions'));
// To be added:
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/messages', require('./routes/messages'));

// In-memory stores for real-time features
const onlineUsers = new Map(); // socketId -> { userId, username, squadId }
const userSockets = new Map(); // userId -> Set of socketIds

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  // User joins with authentication
  socket.on('user:connect', (data) => {
    const { userId, username, squadId } = data;

    onlineUsers.set(socket.id, { userId, username, squadId });

    if (!userSockets.has(userId)) {
      userSockets.set(userId, new Set());
    }
    userSockets.get(userId).add(socket.id);

    console.log(`👤 User connected: ${username} (${userId})`);

    // Join squad room if provided
    if (squadId) {
      socket.join(`squad:${squadId}`);

      // Broadcast to squad that user is online
      io.to(`squad:${squadId}`).emit('user:online', {
        userId,
        username,
        timestamp: Date.now()
      });
    }
  });

  // User joins a squad
  socket.on('squad:join', (data) => {
    const { squadId } = data;
    socket.join(`squad:${squadId}`);

    const user = onlineUsers.get(socket.id);
    if (user) {
      user.squadId = squadId;
      console.log(`📱 ${user.username} joined squad: ${squadId}`);

      // Notify others in squad
      socket.to(`squad:${squadId}`).emit('user:joined', {
        userId: user.userId,
        username: user.username,
        timestamp: Date.now()
      });
    }
  });

  // User leaves a squad
  socket.on('squad:leave', (data) => {
    const { squadId } = data;
    socket.leave(`squad:${squadId}`);

    const user = onlineUsers.get(socket.id);
    if (user) {
      console.log(`📱 ${user.username} left squad: ${squadId}`);

      socket.to(`squad:${squadId}`).emit('user:left', {
        userId: user.userId,
        username: user.username,
        timestamp: Date.now()
      });
    }
  });

  // Send message to squad
  socket.on('message:send', (data) => {
    const { squadId, message } = data;
    const user = onlineUsers.get(socket.id);

    if (user) {
      console.log(`💬 Message from ${user.username} to squad ${squadId}`);

      // Broadcast to all in squad including sender
      io.to(`squad:${squadId}`).emit('message:new', {
        messageId: message.messageId,
        userId: user.userId,
        username: user.username,
        content: message.content,
        messageType: message.messageType,
        timestamp: Date.now()
      });
    }
  });

  // Typing indicator
  socket.on('typing:start', (data) => {
    const { squadId } = data;
    const user = onlineUsers.get(socket.id);

    if (user) {
      socket.to(`squad:${squadId}`).emit('typing:user', {
        userId: user.userId,
        username: user.username,
        isTyping: true
      });
    }
  });

  socket.on('typing:stop', (data) => {
    const { squadId } = data;
    const user = onlineUsers.get(socket.id);

    if (user) {
      socket.to(`squad:${squadId}`).emit('typing:user', {
        userId: user.userId,
        username: user.username,
        isTyping: false
      });
    }
  });

  // Reaction added
  socket.on('reaction:add', (data) => {
    const { squadId, messageId, emoji } = data;
    const user = onlineUsers.get(socket.id);

    if (user) {
      io.to(`squad:${squadId}`).emit('reaction:added', {
        messageId,
        userId: user.userId,
        username: user.username,
        emoji,
        timestamp: Date.now()
      });
    }
  });

  // Disconnect handling
  socket.on('disconnect', () => {
    const user = onlineUsers.get(socket.id);

    if (user) {
      console.log(`👋 User disconnected: ${user.username}`);

      // Remove from online users
      const sockets = userSockets.get(user.userId);
      if (sockets) {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          userSockets.delete(user.userId);

          // Notify squad if user is completely offline
          if (user.squadId) {
            io.to(`squad:${user.squadId}`).emit('user:offline', {
              userId: user.userId,
              username: user.username,
              timestamp: Date.now()
            });
          }
        }
      }

      onlineUsers.delete(socket.id);
    }

    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 Quest MVP Server');
  console.log('='.repeat(50));
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`📡 Network: http://0.0.0.0:${PORT}`);
  console.log(`🔌 Socket.io ready`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log('='.repeat(50) + '\n');
});

module.exports = { app, server, io };
