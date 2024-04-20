const sleep = require('./sleep');
const { handleMarcoCommand, handlePingCommand,handleIACommand } = require('./commands');


module.exports = {
    sleep,
    handleMarcoCommand,
    handlePingCommand,
    handleIACommand,
}