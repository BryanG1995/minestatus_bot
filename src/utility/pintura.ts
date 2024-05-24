
import { EmbedBuilder } from 'discord.js';


//TODO: playList ver que tráeeee
const pinturaCreate = (online: number, max: number, playerList: any, ip: string) => {

    const pintura = new EmbedBuilder()
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
}

export default pinturaCreate;
