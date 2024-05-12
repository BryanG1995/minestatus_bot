const prisma = require("../models/user")

const getUser = async (req, res = response) => {
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

const createUser = async (req, res = response) => {
    try {
        const { nickname, password, name } = req.body

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

const registerUserDiscord = async (nickname, password, name) => {
    try {
        getByNickname(nickname);

        const newUser = await prisma.user.create({
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

const getByNickname = async (nickname) => {
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

module.exports = {
    createUser,
    getUser,
    registerUserDiscord,
}