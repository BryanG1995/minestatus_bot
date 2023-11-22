
const { EmbedBuilder } = require('discord.js');


const pinturaCreate = (online, max, playerList) => {

    const pintura = new EmbedBuilder()
        .setColor('#20176d')
        .setTitle('Status')
        .setURL('https://mcsrvstat.us/server/Tutocraft.g.akliz.net')
        .setAuthor({ name: 'Tutocraft', iconURL: 'https://i.imgur.com/gHNxlpb.png', url: 'https://discord.js.org' })
        .addFields({ name: 'Jugadores Online', value: `${online}/${max}`, inline: true })
        .addFields({ name: 'Tutocraft.g.akliz.net', value: `Cayrox pto`, inline: true })
        .addFields({ name: 'Jugadores', value: `${playerList}`})
        .setTimestamp()
        .setImage('https://i.imgur.com/gHNxlpb.png')
        .setFooter({ text: 'By Paserno and Kuri', iconURL: 'https://i.imgur.com/gHNxlpb.png' });

    return pintura;
}


module.exports = pinturaCreate;