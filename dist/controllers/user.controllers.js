"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByNickname = exports.registerUserDiscord = exports.createUser = exports.getUser = void 0;
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const getUser = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    try {
        const getUser = yield user_1.default.user.findMany();
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
});
exports.getUser = getUser;
const createUser = (...args_2) => __awaiter(void 0, [...args_2], void 0, function* (req = express_1.request, res = express_1.response) {
    try {
        const { nickname, password, name } = req = express_1.request.body;
        const newUser = yield user_1.default.user.create({
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
});
exports.createUser = createUser;
const registerUserDiscord = (nickname, password, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, exports.getByNickname)(nickname);
        yield user_1.default.user.create({
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
});
exports.registerUserDiscord = registerUserDiscord;
const getByNickname = (nickname) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existNickname = yield user_1.default.user.findFirst({
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
});
exports.getByNickname = getByNickname;
