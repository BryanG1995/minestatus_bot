"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("./api"));
const discord_js_1 = require("discord.js");
const pintura_1 = __importDefault(require("./utility/pintura"));
// import default_server from './assets/default_server.png';
const path_1 = __importDefault(require("path"));
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent
    ]
});
const pingDibujo = async (interaction) => {
    try {
        const options = interaction.options;
        let ip = options.getString('ip');
        if (!ip)
            return;
        const { data } = await api_1.default.get(ip);
        const { players } = data;
        const status_server = data.online;
        let list;
        let pintura;
        //asignacion de data de icono recibido por la api, primero se transforma en un buffer y luego usa AttachmentBuilder
        let bufferImage;
        const imgBase64 = data.icon;
        if (imgBase64) {
            bufferImage = Buffer.from(imgBase64.split(',').slice(1).join(','), 'base64');
        }
        else {
            bufferImage = path_1.default.resolve(__dirname, './assets/default_server.png');
        }
        const file = new discord_js_1.AttachmentBuilder(bufferImage, { name: 'icon.png' });
        // if encargado de comprobar si el listado de jugadores está definido y si el server está online
        if (listArray && status_server) {
            list = listArray(players.list);
            pintura = (0, pintura_1.default)(players.online, players.max, list, ip);
            pintura.setAuthor({ name: 'ONLINE', iconURL: 'https://img.icons8.com/?size=256&id=63312&format=png', url: 'https://discord.js.org' });
            pintura.setImage('attachment://icon.png');
        }
        else {
            pintura = (0, pintura_1.default)(0, 0, [` `], ip);
            pintura.setAuthor({ name: 'OFFLINE', iconURL: 'https://img.icons8.com/?size=256&id=81432&format=png', url: 'https://discord.js.org' });
        }
        return { embeds: [pintura], files: [file] };
    }
    catch (error) {
        console.log(error);
        return {};
    }
};
const listArray = (listUser) => {
    // let users = [];
    if (!listUser) {
        return [`No hay Jugadores`];
    }
    const usuariosComoString = listUser.map(user => " \`\`" + user.name + "\`\`");
    return usuariosComoString;
};
exports.default = pingDibujo;
