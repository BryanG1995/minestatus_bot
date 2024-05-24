import { CommandInteraction } from "discord.js";

import pingDibujo from '../ping_dibujo';


const sleep = (ms: number, interaction: CommandInteraction) => {
  return new Promise(resolve => {
    setTimeout(async () => {
      const resultado = await pingDibujo(interaction);
      resolve(resultado);

    }, ms);

  });

}


export default sleep;
