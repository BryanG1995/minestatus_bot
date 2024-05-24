"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        var _a;
        this.app = (0, express_1.default)();
        this.port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080;
        this.path = {
            activate: '/api/activate',
            deactivate: '/api/deactivate',
            user: '/api/user',
        };
        this.middlewares();
        this.routes();
    }
    middlewares() {
        // futures cors
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.path.activate, require('../routes/activate').default);
        this.app.use(this.path.deactivate, require('../routes/deactivate').default);
        this.app.use(this.path.user, require('../routes/user').default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server conectado en el puerto:', this.port);
        });
    }
}
exports.default = Server;
