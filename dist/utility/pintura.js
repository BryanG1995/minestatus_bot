"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
//TODO: playList ver que tráeeee
const pinturaCreate = (online, max, playerList, ip) => {
    const pintura = new discord_js_1.EmbedBuilder()
        .setColor('#20176d')
        .setTitle('Status')
        .setURL(`https://mcsrvstat.us/server/${ip}`)
        .setAuthor({ name: 'Tutocraft', iconURL: 'https://i.imgur.com/gHNxlpb.png', url: 'https://discord.js.org' })
        .addFields({ name: 'Jugadores Online', value: `${online}/${max}`, inline: true })
        .addFields({ name: ip, value: ' ', inline: true })
        .addFields({ name: 'Jugadores', value: `${playerList}` })
        .setTimestamp()
        .setImage('https://i.imgur.com/gHNxlpb.png')
        .setFooter({ text: 'By Paserno and Kuri', iconURL: 'https://i.imgur.com/jhLb7Qu.png' });
    return pintura;
};
exports.default = pinturaCreate;
