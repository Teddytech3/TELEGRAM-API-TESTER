const fs = require("fs");

module.exports = (bot) => {

    bot.onText(/^\/logs$/, async (msg) => {

        const chatId = msg.chat.id;

        try {

            if (!fs.existsSync("logs.txt")) {

                return bot.sendMessage(
                    chatId,
                    "❌ No logs.txt file found."
                );
            }

            await bot.sendDocument(
                chatId,
                "logs.txt"
            );

        } catch (err) {

            console.error(err);

            bot.sendMessage(
                chatId,
                "❌ Failed to send logs."
            );
        }
    });

};