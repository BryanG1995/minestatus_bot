"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = exports.deactivate = exports.activate = void 0;
// const { response } = require('express');
const express_1 = require("express");
const discord_bot_1 = require("../utility/discord_bot");
// const { destruirCliente, revisionStatus, loginClient } = require('../utility/discord_bot')
const activate = (req = express_1.request, res = express_1.response) => {
    (0, discord_bot_1.loginClient)();
    return res.status(200).json({
        ok: true,
        msg: 'activado jijjii',
    });
};
exports.activate = activate;
const deactivate = (req = express_1.request, res = express_1.response) => {
    (0, discord_bot_1.destruirCliente)();
    return res.status(200).json({
        ok: false,
        msg: 'k pro soy, lo he desactivado , Kuri'
    });
};
exports.deactivate = deactivate;
const status = (req = express_1.request, res = express_1.response) => {
    const estado = (0, discord_bot_1.revisionStatus)();
    let msg;
    estado ? msg = 'Estoy prendido' : msg = 'Estoy apagado';
    return res.status(200).json({
        msg: msg,
        estado
    });
};
exports.status = status;
