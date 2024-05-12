const { INTERVAL_DURATION } = require("../constants/general");
const pingDibujo = require("../ping_dibujo");
const sleep = require("./sleep");
const { bardoIA, chatIA } = require("./ia_bard");
const { registerUserDiscord } = require('../controllers/user.controllers');

const handlePingCommand = async (interaction) => {

    try {
        console.log(interaction.user)
        // console.log(interaction.guild)

        let mensaje = interaction.options.getString('mensaje');
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

const handleMarcoCommand = async (interaction) => {
    const dibujo = await pingDibujo(interaction);

    if (Object.keys(dibujo).length === 0) {
        await interaction.reply('hola, fallé');
        return;
    }
    await interaction.reply(dibujo);


    const dibujoNew = await sleep(INTERVAL_DURATION, interaction);


    if (Object.keys(dibujoNew).length === 0) {
        await interaction.reply('hola, fallé rayos!');
        return;
    }
    await interaction.editReply(dibujoNew);
}

const handleIACommand = async (interaction) => {
    let mensaje = interaction.options.getString('mensaje');
    const gif = randomGif();
    await interaction.reply(gif);

    const respuesta = await bardoIA(mensaje);
    await interaction.editReply("**" + mensaje + "**" + ": \`\`\`" + respuesta + "\`\`\`");

}


const handleChatCommand = async (interaction) => {
    let mensaje = interaction.options.getString('mensaje');

    const respuesta = await chatIA(mensaje);

    await interaction.reply("\`\`\`" + respuesta + "\`\`\`");

}

const handleRegistrarseCommand = async (interaction) => {
    const nombre = interaction.options.getString('nombre');
    const password = interaction.options.getString('password');
    const user = interaction.user.globalName;
    
    const registroOK = await registerUserDiscord(user, password, nombre);
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

module.exports = {
    handlePingCommand,
    handleMarcoCommand,
    handleIACommand,
    handleChatCommand,
    handleRegistrarseCommand,
}
