"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const Server = require('./models/server');
const server_1 = __importDefault(require("./models/server"));
// Server on!
const server = new server_1.default();
server.listen();
