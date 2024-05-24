import dotenv from 'dotenv';
dotenv.config();
// const Server = require('./models/server');
import Server from './models/server';


// Server on!
const server = new Server();
server.listen();





