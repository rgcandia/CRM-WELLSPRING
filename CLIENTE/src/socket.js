import io from 'socket.io-client';
let socket;
const apiUrl = import.meta.env.VITE_API_URL;

export const startSocket = ()=>{
    socket = io(apiUrl,{transports:['websocket']})
    console.log('Connecting socket...')
    if (socket) {
       console.log("Conectado")
       socket.emit('join')
      }
}