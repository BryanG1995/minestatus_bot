const { response } = require('express');

const path = require('path');



const activate = (req, res = response) => {

    // res.status(200).json(
    //     msg = 'hola esta activado jijjii')
    
    const filePath = path.resolve(__dirname, '../public/index.html');

    res.sendFile(filePath);
} 



const deactivate = (req, res = response) => {
    
    res.status(200).json(
        msg = 'k pro soy, lo he desactivado , Kuri')

}

module.exports = {
    activate,
    deactivate,
}