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
exports.handleRegistrarseCommand = exports.handleChatCommand = exports.handleIACommand = exports.handleMarcoCommand = exports.handlePingCommand = void 0;
// const { INTERVAL_DURATION } = require("../constants/general");
// const pingDibujo = require("../ping_dibujo");
// const sleep = require("./sleep");
// const { bardoIA, chatIA } = require("./ia_bard");
// const { registerUserDiscord } = require('../controllers/user.controllers');
const general_1 = require("../constants/general");
const ping_dibujo_1 = __importDefault(require("../ping_dibujo"));
const sleep_1 = __importDefault(require("./sleep"));
const ia_bard_1 = require("./ia_bard");
const user_controllers_1 = require("../controllers/user.controllers");
const handlePingCommand = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(interaction.user);
        // console.log(interaction.guild)
        const options = interaction.options;
        let mensaje = options.getString('mensaje');
        let i = 1;
        yield interaction.reply(` El mensaje escrito es:  ${mensaje} por ${interaction.user.globalName}`);
        const intervalID = setInterval(function () {
            return __awaiter(this, void 0, void 0, function* () {
                interaction.editReply(`hola me editaron  ${i} veces cada minuto`);
                i++;
                if (i === 15) {
                    clearInterval(intervalID);
                    console.log(`Ejecución detenida después de ${i} iteraciones`);
                    interaction.editReply(`hola me editaron  ${i} veces y cumplí mis iteraciones `);
                }
            });
        }, general_1.INTERVAL_DURATION);
    }
    catch (error) {
        console.log(error);
    }
});
exports.handlePingCommand = handlePingCommand;
const handleMarcoCommand = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    const dibujo = yield (0, ping_dibujo_1.default)(interaction);
    if (!dibujo)
        return;
    if (Object.keys(dibujo).length === 0) {
        yield interaction.reply('hola, fallé');
        return;
    }
    yield interaction.reply(dibujo);
    const dibujoNew = yield (0, sleep_1.default)(general_1.INTERVAL_DURATION, interaction);
    if (!dibujoNew)
        return;
    if (Object.keys(dibujoNew).length === 0) {
        yield interaction.reply('hola, fallé rayos!');
        return;
    }
    yield interaction.editReply(dibujoNew);
});
exports.handleMarcoCommand = handleMarcoCommand;
const handleIACommand = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    const options = interaction.options;
    let mensaje = options.getString('mensaje');
    const gif = randomGif();
    yield interaction.reply(gif);
    const respuesta = yield (0, ia_bard_1.bardoIA)(mensaje);
    yield interaction.editReply("**" + mensaje + "**" + ": \`\`\`" + respuesta + "\`\`\`");
});
exports.handleIACommand = handleIACommand;
const handleChatCommand = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    const options = interaction.options;
    let mensaje = options.getString('mensaje');
    if (!mensaje)
        return;
    const respuesta = yield (0, ia_bard_1.chatIA)(mensaje);
    yield interaction.reply("\`\`\`" + respuesta + "\`\`\`");
});
exports.handleChatCommand = handleChatCommand;
const handleRegistrarseCommand = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    const options = interaction.options;
    const nombre = options.getString('nombre');
    const password = options.getString('password');
    const nickname = interaction.user.globalName;
    if (!nickname)
        return;
    if (!password)
        return;
    if (!nombre)
        return;
    const registroOK = yield (0, user_controllers_1.registerUserDiscord)(nickname, password, nombre);
    if (registroOK) {
        yield interaction.reply("Registro correcto");
        return;
    }
    yield interaction.reply("No se pudo registrar");
});
exports.handleRegistrarseCommand = handleRegistrarseCommand;
const randomGif = () => {
    const randomNumber = Math.floor(Math.random() * 5); // + 1;
    const array = [
        `https://tenor.com/view/tom-tom-and-jerry-waiting-tom-waiting-gif-17813304`,
        'https://media1.tenor.com/m/aPUYKL5uXmUAAAAC/esp%C3%A9rame-tantito-finn.gif',
        'https://media1.tenor.com/m/g2MjY5JXl1gAAAAd/espereme-un-momento-por-favor-betty.gif',
        'https://tenor.com/bE0vI.gif',
        'https://tenor.com/bIRcU.gif'
    ];
    return array[randomNumber];
};
