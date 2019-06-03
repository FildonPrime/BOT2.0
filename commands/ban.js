var sql = require('../sql');
exports.run = (client, message, arg) => {

    const connection = sql.getSqlConnection();

message.channel.send(`${client.connection.threadId}`)

    

}