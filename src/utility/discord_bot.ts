// const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
// const { handleMarcoCommand, handlePingCommand, handleIACommand, handleChatCommand, handleRegistrarseCommand } = require('./commands');
// const { COMMANDS } = require('../constants/general');
import dotenv from 'dotenv';

import { Client, CommandInteraction, GatewayIntentBits, SlashCommandBuilder } from 'discord.js';
import {
    handleMarcoCommand,
    handlePingCommand,
    handleIACommand,
    handleChatCommand,
    handleRegistrarseCommand
} from './commands';
import { COMMANDS } from '../constants/general';

dotenv.config();

// const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionsBitField, Permissions, AttachmentBuilder } = require('discord.js');
// let client = new Client({
//     intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
// });
let client: any = null;

const createClient = () => {
    return new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
    });
}


const handleReadyEvent = (x: any) => {
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
                .setDescription('mensaje solicitado'))


    const registrarse = new SlashCommandBuilder()
        .setName('registrarse')
        .setDescription('registrate en la base de datos')
        .addStringOption(option =>
            option.setName('nombre')
                .setDescription('nombre'))
        .addStringOption(option =>
            option.setName('password')
                .setDescription('clave utilizada al registrarse'));

    client.application.commands.create(marco_comando);
    client.application.commands.create(ping);
    client.application.commands.create(bardo);
    client.application.commands.create(chat);
    client.application.commands.create(registrarse);
}



//ejecuciones iniciales del bot, inicializacion de los comandos.
// client.on('ready', (x) => handleReadyEvent(x));

const initializeClient = () => {
    if (!client) {
        client = createClient();
        client.on('ready', handleReadyEvent);
        client.on('interactionCreate', handleInteraction);
    }
}




//funciones de los comandos creados anteriormente
// client.on('interactionCreate', async (interaction) => {
const handleInteraction = async (interaction: CommandInteraction) => {
    /** comando de ping, al utilizando, devuelve un mensaje escrito basico, con la info de cantidad de jugadores online y sus nicks
     *  */
    if (!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
        case COMMANDS.PING:
            return await handlePingCommand(interaction);
        case COMMANDS.MARCO:
            return await handleMarcoCommand(interaction);
        case COMMANDS.BARDOIA:
            return await handleIACommand(interaction);
        case COMMANDS.CHAT:
            return await handleChatCommand(interaction);
        case COMMANDS.REGISTRARSE:
            return await handleRegistrarseCommand(interaction);
        default: return;
    }
    //comando de marco, devuelve un mensaje formato embed, el cual posee una mejor estructura del mensaje
};


// const loginClient = () => client.login(process.env.TOKEN);
export const loginClient = async () => {
    initializeClient();
    return await client.login(process.env.TOKEN);
};



export const destruirCliente = () => {
    if (client) {
        client.destroy()
            .then(() => console.log('Cliente Discord destruido exitosamente'))
            .catch((error: any) => console.error('Error al destruir el cliente Discord:', error));
        client = null;
    } else {
        console.error('El cliente Discord no está definido.');
    }
}

export const revisionStatus = () => {
    if (!client) return false;
    const destroyed = client.rest.hashTimer._destroyed;
    const webSocket = client.ws._ws;
    // console.log(client);

    if (!webSocket) {
        console.log('no hay socket');
        return false;
    };

    //* si esta en true destroyed esta destruido
    if (destroyed) {
        console.log('estoy apagado', destroyed);
        return !destroyed
    }
    console.log('estoy prendidizimmooo', destroyed);
    return !destroyed;
}






