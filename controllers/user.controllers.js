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
        const newUser = await prisma.user.create({
            data: {
                nickname: 'John.Doe',
                password: 'jhon123',
                name: 'John Doe'
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




module.exports = {
    createUser,
    getUser,
}