import express, { Application } from 'express';
import cors from 'cors';

interface OptionsPaths {
    activate: string;
    deactivate: string;
    user: string;
}

class Server {
    public app: Application;
    public port: number | string;
    public path: OptionsPaths;

    constructor() {
        this.app = express();
        this.port = process.env.PORT ?? 8080;

        this.path = {
            activate: '/api/activate',
            deactivate: '/api/deactivate',
            user: '/api/user',
        }


        this.middlewares();

        this.routes();
    }

    private middlewares() {
        // futures cors
        this.app.use(cors());

        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    private routes() {
        this.app.use(this.path.activate, require('../routes/activate').default);
        this.app.use(this.path.deactivate, require('../routes/deactivate').default);
        this.app.use(this.path.user, require('../routes/user').default);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('Server conectado en el puerto:', this.port);
        })
    }
}


export default Server;