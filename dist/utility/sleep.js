"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ping_dibujo_1 = __importDefault(require("../ping_dibujo"));
const sleep = (ms, interaction) => {
    return new Promise(resolve => {
        setTimeout(async () => {
            const resultado = await (0, ping_dibujo_1.default)(interaction);
            resolve(resultado);
        }, ms);
    });
};
exports.default = sleep;
