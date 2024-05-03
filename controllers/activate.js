const { response } = require('express');



const { destruirCliente, revisionStatus, loginClient } = require('../utility/discord_bot')



const activate = (req, res = response) => {


    loginClient();
    return res.status(200).json({
        ok: true,
        msg: 'activado jijjii',
    })

}



const deactivate = (req, res = response) => {
    destruirCliente();
    return res.status(200).json({
        ok: false,
        msg: 'k pro soy, lo he desactivado , Kuri'
    })



}

const status = (req, res = response) => {
    const estado = revisionStatus();

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