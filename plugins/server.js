const os = require("os");

module.exports = (bot) => {

    bot.onText(/^\/server$/, async (msg) => {

        const memory =
            ((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2);

        const total =
            (os.totalmem() / 1024 / 1024).toFixed(2);

        const text =
`🖥 SERVER INFO

Platform: ${os.platform()}
CPU: ${os.cpus().length} Cores
RAM Used: ${memory} MB
RAM Total: ${total} MB
Uptime: ${Math.floor(os.uptime() / 60)} mins`;

        await bot.sendMessage(msg.chat.id, text);

    });

};