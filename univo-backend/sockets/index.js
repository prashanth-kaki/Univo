const { socketAuth } = require('../middleware/auth');

module.exports = (io) => {
  // Authenticate all socket connections
  io.use(socketAuth);

  io.on('connection', (socket) => {
    const user = socket.user;
    console.log(`🔌 Socket connected: ${user.name} (${user.role}) [${socket.id}]`);

    // Join personal room for direct notifications
    socket.join(`user:${user._id}`);

    // Join year/branch room for announcements
    if (user.role === 'student') {
      socket.join(`year:${user.branch}:${user.year}`);
    } else if (user.role === 'faculty') {
      // Faculty join all year rooms for their branch
      [1, 2, 3, 4].forEach((yr) => socket.join(`year:${user.branch}:${yr}`));
    } else if (user.role === 'hod') {
      [1, 2, 3, 4].forEach((yr) => socket.join(`year:${user.branch}:${yr}`));
      socket.join('hod:community');
    } else if (['admin', 'coordinator'].includes(user.role)) {
      socket.join('admin:room');
    }

    // Join subject discussion rooms
    socket.on('joinSubject', (subjectId) => {
      socket.join(`subject:${subjectId}`);
      console.log(`📚 ${user.name} joined subject room: ${subjectId}`);
    });

    socket.on('leaveSubject', (subjectId) => {
      socket.leave(`subject:${subjectId}`);
    });

    // Direct chat room
    socket.on('joinChat', (partnerId) => {
      const roomId = [user._id.toString(), partnerId].sort().join(':');
      socket.join(`chat:${roomId}`);
    });

    socket.on('leaveChat', (partnerId) => {
      const roomId = [user._id.toString(), partnerId].sort().join(':');
      socket.leave(`chat:${roomId}`);
    });

    // Typing indicator
    socket.on('typing', ({ receiverId, isTyping }) => {
      socket.to(`user:${receiverId}`).emit('typing', {
        senderId: user._id,
        senderName: user.name,
        isTyping,
      });
    });

    // Online presence
    socket.to(`year:${user.branch}:${user.year}`).emit('userOnline', { userId: user._id });

    socket.on('disconnect', () => {
      console.log(`🔌 Socket disconnected: ${user.name} [${socket.id}]`);
      io.to(`year:${user.branch}:${user.year}`).emit('userOffline', { userId: user._id });
    });
  });
};
