var mysql = require('mysql');
var connection = null;
var counter = 1;
var interval = null;
function reconnect(client) {
    if (counter != 5) {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: null,
            database: 'botdb'
        });   
        client.connection = connection.connect(function (err) {
            if(err) {
                counter++;
                client.webhook.send(`\`\`\`\n[${Number(new Date())}] RETRYING\n\`\`\``)
            } else {
                clearInterval(interval);
                return client.webhook.send(`\`\`\`\nMYSQL CONNECTED\n\nCONNECTION THREAD ID : ${connection.threadId}\n\n[${Number(new Date())}]CONNECTION SUCCESSFULLY PINGED\n\`\`\``);
            }
        
        });   
    } else {
        clearInterval(interval);
        return client.webhook.send(`\`\`\`\n[${Number(new Date())}] STOPPED TRYING TO RECONNECT\n\`\`\``)
    }
}
module.exports = {
    setupSqlConnection: function (client) {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: null,
            database: 'assignment'
        });

        connection.connect(function (err) {
            if (err) {
                client.webhook.send(`\`\`\`\nSQL ERROR ON CONNECTION\n\n[${Number(new Date())}]\n\n${err.stack}\n\nNOTICE : TRYING TO RECONNECT EVERY 2 SECONDS. Will Disconnect after 5 Tries\n\`\`\``);
                interval = setInterval(function() {reconnect(client)}, 2000);

            } else {
                client.webhook.send(`\`\`\`\nMYSQL CONNECTED\n\nCONNECTION THREAD ID : ${connection.threadId}\n\n[${Number(new Date())}]CONNECTION SUCCESSFULLY PINGED\n\`\`\``);
            }
        });
    },



    getSqlConnection: function () {
        return connection;
    },

    testMessage: function (message) {
        message.channel.send("test");
    }
}