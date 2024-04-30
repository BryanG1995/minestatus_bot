require('dotenv').config();
const Server = require('./models/server');


// Server on!
const server = new Server();
server.listen();





