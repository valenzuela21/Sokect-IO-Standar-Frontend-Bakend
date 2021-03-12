
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const  path = require('path');
const Sockets = require('./sockets');

class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Create http server
        this.server = http.createServer(this.app);

        //Configuration of Sockets
        this.io = socketio(this.server, {/*Configuration*/});

    }

    middlewares(){
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    configSockets(){
            new Sockets(this.io);
    }

    execute(){
        //Initial Middelwares
        this.middlewares();
        this.configSockets();
        //Listen server start port 8080
        this.server.listen(this.port, ()=>{
            console.log('Server config of PORT:', this.port)
        });
    }
}

module.exports = Server
