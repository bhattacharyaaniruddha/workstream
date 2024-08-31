let io; 
const setSocketIO = (socketIO) => {
    io = socketIO; // Set the io instance
};

const emitNotification = (event, data) => {
    if (io) {
        io.emit(event, data); 
    } else {
        console.error('SocketIO not initialized');
    }
};

module.exports = {
    setSocketIO,
    emitNotification,
};
