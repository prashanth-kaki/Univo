// services/socketService.js

let ioInstance = null;

// ======================================
// SET SOCKET IO INSTANCE
// ======================================

const setIO = (io) => {
    ioInstance = io;
};

// ======================================
// GET SOCKET IO INSTANCE
// ======================================

const getIO = () => {
    if (!ioInstance) {
        throw new Error(
            "Socket.io not initialized"
        );
    }

    return ioInstance;
};

// ======================================
// SEND EVENT TO USER
// ======================================

const emitToUser = (
    userId,
    event,
    data
) => {
    if (!ioInstance) return;

    ioInstance
        .to(userId.toString())
        .emit(event, data);
};

// ======================================
// BROADCAST EVENT
// ======================================

const broadcast = (
    event,
    data
) => {
    if (!ioInstance) return;

    ioInstance.emit(event, data);
};

module.exports = {
    setIO,
    getIO,
    emitToUser,
    broadcast,
};