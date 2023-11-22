const axios = require('axios');

const baseURL = process.env.IP_SERVER;

const connectionApi = axios.create({ baseURL });

module.exports = connectionApi;

