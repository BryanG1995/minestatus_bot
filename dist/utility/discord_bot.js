"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revisionStatus = exports.destruirCliente = exports.loginClient = void 0;
// const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
// const { handleMarcoCommand, handlePingCommand, handleIACommand, handleChatCommand, handleRegistrarseCommand } = require('./commands');
// const { COMMANDS } = require('../constants/general');
const dotenv_1 = __importDefault(require("dotenv"));
const discord_js_1 = require("discord.js");
const commands_1 = require("./commands");
const general_1 = require("../constants/general");
dotenv_1.default.config();
// const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionsBitField, Permissions, AttachmentBuilder } = require('discord.js');
// let client = new Client({
//     intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
// });
let client = null;
const createClient = () => {
    return new discord_js_1.Client({
        intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.MessageContent]
    });
};
const handleReadyEvent = (x) => {
    console.log(`Bot iniciado como ${x.user.tag}!`);
    client.user.setActivity('Hola soy un bot');
    const ping = new discord_js_1.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping a server')
        .addStringOption(option => option.setName('mensaje')
        .setDescription('mensaje solicitado'));
    const marco_comando = new discord_js_1.SlashCommandBuilder()
        .setName('marco')
        .setDescription('Marco embed')
        .addStringOption(option => option.setName('ip')
        .setDescription('ip server'));
    const bardo = new discord_js_1.SlashCommandBuilder()
        .setName('bardoia')
        .setDescription('Preguntale algo a la ia')
        .addStringOption(option => option.setName('mensaje')
        .setDescription('mensaje solicitado'));
    const chat = new discord_js_1.SlashCommandBuilder()
        .setName('chat')
        .setDescription('habla con alguien')
        .addStringOption(option => option.setName('mensaje')
        .setDescription('mensaje solicitado'));
    const registrarse = new discord_js_1.SlashCommandBuilder()
        .setName('registrarse')
        .setDescription('registrate en la base de datos')
        .addStringOption(option => option.setName('nombre')
        .setDescription('nombre'))
        .addStringOption(option => option.setName('password')
        .setDescription('clave utilizada al registrarse'));
    client.application.commands.create(marco_comando);
    client.application.commands.create(ping);
    client.application.commands.create(bardo);
    client.application.commands.create(chat);
    client.application.commands.create(registrarse);
};
//ejecuciones iniciales del bot, inicializacion de los comandos.
// client.on('ready', (x) => handleReadyEvent(x));
const initializeClient = () => {
    if (!client) {
        client = createClient();
        client.on('ready', handleReadyEvent);
        client.on('interactionCreate', handleInteraction);
    }
};
//funciones de los comandos creados anteriormente
// client.on('interactionCreate', async (interaction) => {
const handleInteraction = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    /** comando de ping, al utilizando, devuelve un mensaje escrito basico, con la info de cantidad de jugadores online y sus nicks
     *  */
    if (!interaction.isChatInputCommand())
        return;
    switch (interaction.commandName) {
        case general_1.COMMANDS.PING:
            return yield (0, commands_1.handlePingCommand)(interaction);
        case general_1.COMMANDS.MARCO:
            return yield (0, commands_1.handleMarcoCommand)(interaction);
        case general_1.COMMANDS.BARDOIA:
            return yield (0, commands_1.handleIACommand)(interaction);
        case general_1.COMMANDS.CHAT:
            return yield (0, commands_1.handleChatCommand)(interaction);
        case general_1.COMMANDS.REGISTRARSE:
            return yield (0, commands_1.handleRegistrarseCommand)(interaction);
        default: return;
    }
    //comando de marco, devuelve un mensaje formato embed, el cual posee una mejor estructura del mensaje
});
// const loginClient = () => client.login(process.env.TOKEN);
const loginClient = () => __awaiter(void 0, void 0, void 0, function* () {
    initializeClient();
    return yield client.login(process.env.TOKEN);
});
exports.loginClient = loginClient;
const destruirCliente = () => {
    if (client) {
        client.destroy()
            .then(() => console.log('Cliente Discord destruido exitosamente'))
            .catch((error) => console.error('Error al destruir el cliente Discord:', error));
        client = null;
    }
    else {
        console.error('El cliente Discord no está definido.');
    }
};
exports.destruirCliente = destruirCliente;
const revisionStatus = () => {
    if (!client)
        return false;
    const destroyed = client.rest.hashTimer._destroyed;
    const webSocket = client.ws._ws;
    // console.log(client);
    if (!webSocket) {
        console.log('no hay socket');
        return false;
    }
    ;
    //* si esta en true destroyed esta destruido
    if (destroyed) {
        console.log('estoy apagado', destroyed);
        return !destroyed;
    }
    console.log('estoy prendidizimmooo', destroyed);
    return !destroyed;
};
exports.revisionStatus = revisionStatus;
