const pingDibujo = require('../ping_dibujo');


const sleep = (ms, interaction) => {
    return new Promise(resolve => {
      setTimeout(async () => {
        const resultado = await pingDibujo(interaction);
        resolve(resultado);
  
      }, ms);
  
    });
  
  }


module.exports = sleep;
