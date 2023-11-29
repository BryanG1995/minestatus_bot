require('dotenv').config();
const connectionApi = require('./api');
const pinturaCreate = require('./utility/pintura');
const pingDibujo = require('./ping_dibujo');

const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionsBitField, Permissions, AttachmentBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });



//ejecuciones iniciales del bot, inicializacion de los comandos
client.on('ready', (x) => {
  console.log(`Bot iniciado como ${x.user.tag}!`);
  client.user.setActivity('Hola soy un bot');

  const ping = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping a server')
    .addStringOption(option =>
      option.setName('mensaje')
        .setDescription('mensaje solicitado'))
    ;

  const marco_comando = new SlashCommandBuilder()
    .setName('marco')
    .setDescription('Marco embed')
    .addStringOption(option =>
      option.setName('ip')
        .setDescription('ip server'))
    ;


  client.application.commands.create(marco_comando);

  client.application.commands.create(ping);
});


//funciones de los comandos creados anteriormente
client.on('interactionCreate', async (interaction) => {


  //comando de ping, al utilizando, devuelve un mensaje escrito basico, con la info de cantidad de jugadores online y sus nicks
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'ping') {
    let mensaje = interaction.options.getString('mensaje');
    var i= 1;

    try {
      // const { data } = await connectionApi.get();
      // const { players } = data
      // interaction.reply(` ${mensaje}
      // Jugadores Online: ${players.online}/${players.max}\nJugadores: \n ${listArrayOld(players.list)}
      // `);

      await interaction.reply(` El mensaje escrito es:  ${mensaje}
       
       `);
      //await sleep(5000);

      var intervalID = setInterval(async function(){

        
        interaction.editReply(`hola me editaron  ${i} veces cada minuto` );
        i++;
        if (i == 25) {
          clearInterval(intervalID);
          console.log(`Ejecución detenida después de ${i} iteraciones`);
          interaction.editReply(`hola me editaron  ${i} veces y cumplí mis iteraciones ` );
        }


        }, 1000 * 60 * 1)


      //await interaction.editReply('hola me editaron');
      

    } catch (error) {
      console.log(error);
    }
  }

  //comando de marco, devuelve un mensaje formato embed, el cual posee una mejor estructura del mensaje
  if (interaction.commandName === 'marco') {

    const dibujo = await pingDibujo(interaction);

    if (Object.keys(dibujo).length === 0) {
      await interaction.reply('hola, fallé');
      return;
    }
    await interaction.reply(dibujo);



    const dibujoNew = await sleep(1000 * 60 * 1, interaction);
    

    if (Object.keys(dibujoNew).length === 0) {
      await interaction.reply('hola, fallé rayos!');
      return;
    }
    await interaction.editReply(dibujoNew);

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



function sleep(ms, interaction) {


  return new Promise(resolve => {
    setTimeout(async () => {
      const resultado =  await pingDibujo(interaction);
      resolve(resultado);

    }, ms);

  });


}

//nodemon bot.js