import axios from 'axios';


const baseURL = process.env.IP_SERVER;

const connectionApi = axios.create({ baseURL });

export default connectionApi;

