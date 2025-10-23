let io;

const setIoInstance = (instance) => {
  io = instance;
};

const emitEvent = (event, data) => {
  if (io) {
    io.emit(event, data);
  } else {
    console.error('Socket.io no está inicializado');
  }
};

module.exports = { setIoInstance, emitEvent };
