const { response } = require('express');

const activate = (req, res = response) => {

    res.status(200).json(
        msg = 'hola esta activado jijjii')

}



const deactivate = (req, res = response) => {
    
    res.status(200).json(
        msg = 'k pro soy, lo he desactivado , Kuri')

}

module.exports = {
    activate,
    deactivate,
}