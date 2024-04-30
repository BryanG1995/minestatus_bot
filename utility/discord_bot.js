require('dotenv').config();


const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const { handleMarcoCommand, handlePingCommand, handleIACommand, handleChatCommand } = require('./commands');

const { COMMANDS } = require('../constants/general');

let status = false;



// const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionsBitField, Permissions, AttachmentBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });



const handleReadyEvent = (x) => {
    console.log(`Bot iniciado como ${x.user.tag}!`);
    client.user.setActivity('Hola soy un bot');

    const ping = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping a server')
        .addStringOption(option =>
            option.setName('mensaje')
                .setDescription('mensaje solicitado'));

    const marco_comando = new SlashCommandBuilder()
        .setName('marco')
        .setDescription('Marco embed')
        .addStringOption(option =>
            option.setName('ip')
                .setDescription('ip server'));

    const bardo = new SlashCommandBuilder()
        .setName('bardoia')
        .setDescription('Preguntale algo a la ia')
        .addStringOption(option =>
            option.setName('mensaje')
                .setDescription('mensaje solicitado'));

    const chat = new SlashCommandBuilder()
        .setName('chat')
        .setDescription('habla con alguien')
        .addStringOption(option =>
            option.setName('mensaje')
                .setDescription('mensaje solicitado'));

    client.application.commands.create(marco_comando);
    client.application.commands.create(ping);
    client.application.commands.create(bardo);
    client.application.commands.create(chat);
}



//ejecuciones iniciales del bot, inicializacion de los comandos
client.on('ready', (x) => {
    handleReadyEvent(x);
    status = true;
    console.log('estado dentro' , status);




});
// console.log('estado fuera' , status);



//funciones de los comandos creados anteriormente
client.on('interactionCreate', async (interaction) => {
    /** comando de ping, al utilizando, devuelve un mensaje escrito basico, con la info de cantidad de jugadores online y sus nicks
     *  */

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === COMMANDS.PING) await handlePingCommand(interaction);
    if (interaction.commandName === COMMANDS.MARCO) await handleMarcoCommand(interaction);
    if (interaction.commandName === COMMANDS.BARDOIA) await handleIACommand(interaction);
    if (interaction.commandName === COMMANDS.CHAT) await handleChatCommand(interaction);
    //comando de marco, devuelve un mensaje formato embed, el cual posee una mejor estructura del mensaje
});


client.login(process.env.TOKEN);



const destruirCliente = () => {
    if (client) {
        client.destroy()
            .then(() => {
                console.log('Cliente Discord destruido exitosamente')
                status = false;
                console.log(status);
            })
            .catch(error => console.error('Error al destruir el cliente Discord:', error));

        return 'hola'
    } else {
        console.error('El cliente Discord no está definido.');
        return 'falla'
    }
}

const revisionStatus = () => {
    if (client) {
        console.log(client)
      return true
    } else {
        console.log(client)
        return false;
    }
}


module.exports = { destruirCliente, revisionStatus };




