const sleep = require('./sleep');
const { handleMarcoCommand, handlePingCommand, handleIACommand, handleChatCommand, handleRegistrarseCommand} = require('./commands');


module.exports = {
    sleep,
    handleMarcoCommand,
    handlePingCommand,
    handleIACommand,
    handleChatCommand,
    handleRegistrarseCommand,
}