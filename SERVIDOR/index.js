const httpServer = require('./src/app.js')
const {conn} = require('./src/db.js');
require('dotenv').config();
const {PORT} = process.env;
//config init

conn.sync().then(()=>{

    console.log('db sincronizada')
    httpServer.listen(PORT,()=>{
        console.log('Servidor Listo en puerto : '+PORT)
    }); 
});