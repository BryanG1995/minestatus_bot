const { response } = require('express');

const activate = (req, res) => {

    res.status(200).json(
        msg = 'hola esta activado jijjii')

}



const deactivate = (req, res) => {
    
    res.status(200).json(
        msg = 'desactivado')

}

module.exports = {
    activate,
    deactivate,
}