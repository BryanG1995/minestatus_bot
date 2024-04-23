const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = 8080;

        this.path = {
            activate: '/api/activate',
            deactivate: '/api/deactivate',
        }


        this.middlewares();

        this.routes();
    }

    middlewares(){ 
        // futures cors

        this.app.use( express.json() );
    }

    routes(){
        this.app.use( this.path.activate, require('../routes/activate'));
        this.app.use( this.path.deactivate, require('../routes/deactivate'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server conectado en el puerto:', this.port);
        })
     }
}


module.exports = Server;