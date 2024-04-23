const { response } = require('express');

const activate = (req, res = response) => {

    res.status(200).json(
        msg = 'hola esta activado jijjii')

}



const deactivate = (req, res = response) => {
    
    res.status(200).json(
        msg = 'desactivado')

}

module.exports = {
    activate,
    deactivate,
}