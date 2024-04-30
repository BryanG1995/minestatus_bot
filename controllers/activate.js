const { response } = require('express');

const path = require('path');

const { destruirCliente, revisionStatus } = require('../utility/discord_bot')



const activate = (req, res = response) => {

    // res.status(200).json(
    //     msg = 'hola esta activado jijjii')

    const filePath = path.resolve(__dirname, '../public/index.html');

    res.sendFile(filePath);
}



const deactivate = (req, res = response) => {
    destruirCliente();


    return res.status(200).json(
        msg = 'k pro soy, lo he desactivado , Kuri')



}

const status = (req, res = response) => {
    const estado = revisionStatus();
    // if (estado) {
    //     msg = 'Estoy prendido'
    // }
    // else {
    //     msg = 'Estoy apagado'
    // }

    estado ? msg = 'Estoy prendido' : msg = 'Estoy apagado';

    return res.status(200).json({
        msg: msg,
        estado
    })



}

module.exports = {
    activate,
    deactivate,
    status,
}