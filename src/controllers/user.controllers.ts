import { response, request } from 'express';
import prisma from '../models/user';

export const getUser = async (req = request, res = response) => {
    try {
        const getUser = await prisma.user.findMany()

        return res.status(200).json({
            ok: true,
            getUser
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "ha ocurrido un error"
        })
    }


}

export const createUser = async (req = request, res = response) => {
    try {
        const { nickname, password, name } = req = request.body

        const newUser = await prisma.user.create({
            data: {
                nickname,
                password,
                name,
            }

        })

        return res.status(201).json({
            ok: true,
            msg: 'Nuevo usuario creado', newUser,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "ha ocurrido un error"
        })
    }
}



export const registerUserDiscord = async (nickname: string, password: string, name: string) => {
    try {
        getByNickname(nickname);

        await prisma.user.create({
            data: {
                nickname,
                password,
                name,
            }
        })
        return true;
    } catch (error) {
        console.log("me cai", error);
        return false
    }

}

export const getByNickname = async (nickname: string) => {
    try {
        const existNickname = await prisma.user.findFirst({
            where: {
                nickname: nickname
            }
        })
        if (existNickname) {
            throw new Error(`Nick ${nickname} ya existe`)
        }
        return true
    } catch (error) {
        console.log(error);
    }


}

