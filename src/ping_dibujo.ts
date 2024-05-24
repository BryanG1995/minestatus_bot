import { CommandInteraction, CommandInteractionOptionResolver } from "discord.js";

import connectionApi from './api';
import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionsBitField,
  Permissions,
  AttachmentBuilder
} from 'discord.js';
import pinturaCreate from './utility/pintura';
// import default_server from './assets/default_server.png';
import path from 'path';



const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const pingDibujo = async (interaction: CommandInteraction) => {

  try {
    const options = interaction.options as CommandInteractionOptionResolver;
    let ip = options.getString('ip');
    if (!ip) return;
    const { data } = await connectionApi.get(ip);
    const { players } = data;


    const status_server = data.online;
    let list;
    let pintura;

    //asignacion de data de icono recibido por la api, primero se transforma en un buffer y luego usa AttachmentBuilder
    let bufferImage: any;

    const imgBase64 = data.icon;
    if (imgBase64) {
      bufferImage = Buffer.from(imgBase64.split(',').slice(1).join(','), 'base64');

    }
    else{
      bufferImage = path.resolve(__dirname, './assets/default_server.png');
      
    }
    const file = new AttachmentBuilder(bufferImage, { name: 'icon.png' });




    // if encargado de comprobar si el listado de jugadores está definido y si el server está online
    if (listArray && status_server) {
      list = listArray(players.list);
      pintura = pinturaCreate(players.online, players.max, list, ip);
      pintura.setAuthor({ name: 'ONLINE', iconURL: 'https://img.icons8.com/?size=256&id=63312&format=png', url: 'https://discord.js.org' });
      pintura.setImage('attachment://icon.png');

    }
    else {
      pintura = pinturaCreate(0, 0, [` `], ip);
      pintura.setAuthor({ name: 'OFFLINE', iconURL: 'https://img.icons8.com/?size=256&id=81432&format=png', url: 'https://discord.js.org' });

    }


    return { embeds: [pintura], files: [file] };

  } catch (error) {
    console.log(error);
    return {};
  }

};


interface User {
  name: string;
}
const listArray = (listUser: User[]) => {

  // let users = [];
  if (!listUser) {
    return [`No hay Jugadores`];
  }


  const usuariosComoString = listUser.map(user => " \`\`" + user.name + "\`\`")


  return usuariosComoString;
}

export default pingDibujo;