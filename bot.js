require('dotenv').config();
const connectionApi = require('./api');
const pinturaCreate = require('./utility/pintura');

const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionsBitField, Permissions } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });



//ejecuciones iniciales del bot, inicializacion de los comandos
client.on('ready', (x) => {
  console.log(`Bot iniciado como ${x.user.tag}!`);
  client.user.setActivity('Hola soy un bot');

  const ping = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping a server');

  const marco_comando = new SlashCommandBuilder()
    .setName('marco')
    .setDescription('Marco embed');


  client.application.commands.create(marco_comando);

  client.application.commands.create(ping);
});


//funciones de los comandos creados anteriormente
client.on('interactionCreate', async (interaction) => {

  
//comando de ping, al utilizando, devuelve un mensaje escrito basico, con la info de cantidad de jugadores online y sus nicks
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'ping') {

    try {
      const { data } = await connectionApi.get();
      const { players } = data
      interaction.reply(`
      Jugadores Online: ${players.online}/${players.max}\nJugadores: \n ${listArrayOld(players.list)}
      `);

    } catch (error) {
      console.log(error);
    }
  }

//comando de marco, devuelve un mensaje formato embed, el cual posee una mejor estructura del mensaje
  if (interaction.commandName === 'marco') {
    
    const { data } = await connectionApi.get();
    const { players } = data;
    
    const list = listArray(players.list);

    const pintura = pinturaCreate(players.online, players.max, list);
    if(data.online = true) {
      pintura.setAuthor({ name: 'ONLINE', iconURL: 'https://img.icons8.com/?size=256&id=63312&format=png', url: 'https://discord.js.org' })
    }else {
      pintura.setAuthor({ name: 'OFFLINE', iconURL: 'https://img.icons8.com/?size=256&id=81432&format=png', url: 'https://discord.js.org' })
      
    }
  

    //llamado de embed creado en la parte superior
    interaction.reply({ embeds: [pintura] });

  }
  

});

client.login(process.env.TOKEN);


const listArrayOld = (listUser) => {

  let users = ``;

  for (let i = 0; i < listUser.length; i++) {
    users += listUser[i].name + '\n';
  }

  return users.trim();
}

const listArray = (listUser) => {

  // let users = [];

  if (!listUser) {
    return [`No hay Jugadores`];
  }

  // for (let i = 0; i < listUser.length; i++) {
  //   users.push(`${listUser[i].name}`);
  // }

  const usuariosComoString = listUser.map(user => " \`\`" + user.name + "\`\`")


  // return users.join('\n');
  return usuariosComoString;
}

//nodemon bot.js