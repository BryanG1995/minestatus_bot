const { response } = require('express');

const path = require('path');

const {destruirCliente,revisionStatus }= require('../utility/discord_bot')



const activate = (req, res = response) => {

    // res.status(200).json(
    //     msg = 'hola esta activado jijjii')
    
    const filePath = path.resolve(__dirname, '../public/index.html');

    res.sendFile(filePath);
} 



const deactivate = (req, res = response) => {
    const result =  destruirCliente();
    console.log(result);

    return res.status(200).json(
        msg = 'k pro soy, lo he desactivado , Kuri')

        

}

const status = (req, res = response) => {
    const estado = revisionStatus();
    return res.status(200).json({
        msg : 'hola soy un status ',
        estado
    })

        

}

module.exports = {
    activate,
    deactivate,
    status,
}