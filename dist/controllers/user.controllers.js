"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByNickname = exports.registerUserDiscord = exports.createUser = exports.getUser = void 0;
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const getUser = async (req = express_1.request, res = express_1.response) => {
    try {
        const getUser = await user_1.default.user.findMany();
        return res.status(200).json({
            ok: true,
            getUser
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "ha ocurrido un error"
        });
    }
};
exports.getUser = getUser;
const createUser = async (req = express_1.request, res = express_1.response) => {
    try {
        const { nickname, password, name } = req = express_1.request.body;
        const newUser = await user_1.default.user.create({
            data: {
                nickname,
                password,
                name,
            }
        });
        return res.status(201).json({
            ok: true,
            msg: 'Nuevo usuario creado', newUser,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "ha ocurrido un error"
        });
    }
};
exports.createUser = createUser;
const registerUserDiscord = async (nickname, password, name) => {
    try {
        (0, exports.getByNickname)(nickname);
        await user_1.default.user.create({
            data: {
                nickname,
                password,
                name,
            }
        });
        return true;
    }
    catch (error) {
        console.log("me cai", error);
        return false;
    }
};
exports.registerUserDiscord = registerUserDiscord;
const getByNickname = async (nickname) => {
    try {
        const existNickname = await user_1.default.user.findFirst({
            where: {
                nickname: nickname
            }
        });
        if (existNickname) {
            throw new Error(`Nick ${nickname} ya existe`);
        }
        return true;
    }
    catch (error) {
        console.log(error);
    }
};
exports.getByNickname = getByNickname;
