// const { INTERVAL_DURATION } = require("../constants/general");
// const pingDibujo = require("../ping_dibujo");
// const sleep = require("./sleep");
// const { bardoIA, chatIA } = require("./ia_bard");
// const { registerUserDiscord } = require('../controllers/user.controllers');
import { INTERVAL_DURATION } from '../constants/general';
import pingDibujo from '../ping_dibujo';
import sleep from './sleep';
import { bardoIA, chatIA } from './ia_bard';
import { registerUserDiscord } from '../controllers/user.controllers';
import { CommandInteraction, CommandInteractionOptionResolver  } from 'discord.js';


export const handlePingCommand = async (interaction: CommandInteraction): Promise<void> => {
    try {
        console.log(interaction.user)
        // console.log(interaction.guild)
        
        const options = interaction.options as CommandInteractionOptionResolver;
        let mensaje  = options.getString('mensaje');
        let i = 1;
        await interaction.reply(` El mensaje escrito es:  ${mensaje} por ${interaction.user.globalName}`);

        const intervalID = setInterval(async function () {

            interaction.editReply(`hola me editaron  ${i} veces cada minuto`);
            i++;
            if (i === 15) {
                clearInterval(intervalID);
                console.log(`Ejecución detenida después de ${i} iteraciones`);
                interaction.editReply(`hola me editaron  ${i} veces y cumplí mis iteraciones `);
            }

        }, INTERVAL_DURATION)
    } catch (error) {
        console.log(error);
    }
}

export const handleMarcoCommand = async (interaction: CommandInteraction) => {
    const dibujo = await pingDibujo(interaction);

    if (!dibujo) return;

    if (Object.keys(dibujo).length === 0) {
        await interaction.reply('hola, fallé');
        return;
    }
    await interaction.reply(dibujo);


    const dibujoNew = await sleep(INTERVAL_DURATION, interaction);
    if (!dibujoNew) return;

    if (Object.keys(dibujoNew).length === 0) {
        await interaction.reply('hola, fallé rayos!');
        return;
    }
    await interaction.editReply(dibujoNew);
}

export const handleIACommand = async (interaction: CommandInteraction) => {
    const options = interaction.options as CommandInteractionOptionResolver;
    let mensaje = options.getString('mensaje');
    const gif = randomGif();
    await interaction.reply(gif);

    const respuesta = await bardoIA(mensaje!);
    await interaction.editReply("**" + mensaje + "**" + ": \`\`\`" + respuesta + "\`\`\`");

}


export const handleChatCommand = async (interaction: CommandInteraction) => {
    const options = interaction.options as CommandInteractionOptionResolver;
    let mensaje = options.getString('mensaje');

    if (!mensaje) return;

    const respuesta = await chatIA(mensaje);

    await interaction.reply("\`\`\`" + respuesta + "\`\`\`");

}

export const handleRegistrarseCommand = async (interaction: CommandInteraction) => {
    const options = interaction.options as CommandInteractionOptionResolver;
    const nombre = options.getString('nombre');
    const password = options.getString('password');
    const nickname = interaction.user.globalName;

    if (!nickname) return; 
    if (!password) return; 
    if (!nombre) return; 

    const registroOK = await registerUserDiscord(nickname, password, nombre);
    if (registroOK) {
        await interaction.reply("Registro correcto");
        return
    }
    await interaction.reply("No se pudo registrar");

}

const randomGif = () => {

    const randomNumber = Math.floor(Math.random() * 5);// + 1;
    const array = [
        `https://tenor.com/view/tom-tom-and-jerry-waiting-tom-waiting-gif-17813304`,
        'https://media1.tenor.com/m/aPUYKL5uXmUAAAAC/esp%C3%A9rame-tantito-finn.gif',
        'https://media1.tenor.com/m/g2MjY5JXl1gAAAAd/espereme-un-momento-por-favor-betty.gif',
        'https://tenor.com/bE0vI.gif',
        'https://tenor.com/bIRcU.gif'
    ]
    return array[randomNumber];
}

