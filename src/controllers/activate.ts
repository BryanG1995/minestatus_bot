// const { response } = require('express');
import { response, request } from 'express';


import { destruirCliente, revisionStatus, loginClient } from '../utility/discord_bot';
// const { destruirCliente, revisionStatus, loginClient } = require('../utility/discord_bot')




export const activate = (req = request, res = response) => {


    loginClient();
    return res.status(200).json({
        ok: true,
        msg: 'activado jijjii',
    })

}



export const deactivate = (req = request, res = response) => {
    destruirCliente();
    return res.status(200).json({
        ok: false,
        msg: 'k pro soy, lo he desactivado , Kuri'
    })



}

export const status = (req = request, res = response) => {
    const estado = revisionStatus();
    let msg;

    estado ? msg = 'Estoy prendido' : msg = 'Estoy apagado';

    return res.status(200).json({
        msg: msg,
        estado
    })



}

