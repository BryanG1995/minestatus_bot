const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = 8080;

        this.path = {
            activate: '/api/activate',
            deactivate: '/api/deactivate',
            user: '/api/user',
        }


        this.middlewares();

        this.routes();
    }

    middlewares() {
        // futures cors
        this.app.use(cors());

        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.path.activate, require('../routes/activate'));
        this.app.use(this.path.deactivate, require('../routes/deactivate'));
        this.app.use(this.path.user, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server conectado en el puerto:', this.port);
        })
    }
}


module.exports = Server;