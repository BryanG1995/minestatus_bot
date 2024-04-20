const { INTERVAL_DURATION } = require("../constants/general");
const pingDibujo = require("../ping_dibujo");
const sleep = require("./sleep");
const bardoIA = require("./ia_bard");

const handlePingCommand = async (interaction) => {
    

    await interaction.reply(` El mensaje escrito es:  ${respuesta}`);

    try {
        let mensaje = interaction.options.getString('mensaje');
        let i = 1;
        await interaction.reply(` El mensaje escrito es:  ${mensaje}`);

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

    const respuesta = await bardoIA(mensaje);
    
    await interaction.reply( "**" + mensaje + "**"+ ": \`\`\`" + respuesta + "\`\`\`");

}

module.exports = {
    handlePingCommand, 
    handleMarcoCommand,
    handleIACommand,
}
