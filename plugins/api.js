const axios = require("axios");

module.exports = (bot) => {

    bot.onText(/^\/api (.+)/, async (msg, match) => {

        const chatId = msg.chat.id;
        const url = match[1];

        try {

            await bot.sendMessage(chatId, "🔍 Fetching API response...");

            const { data } = await axios.get(url, {
                timeout: 30000
            });

            const response = JSON.stringify(data, null, 2);

            if (response.length > 4000) {

                return bot.sendDocument(chatId,
                    Buffer.from(response),
                    {},
                    {
                        filename: "response.json",
                        contentType: "application/json"
                    }
                );
            }

            await bot.sendMessage(chatId,
                `\`\`\`json\n${response}\n\`\`\``,
                { parse_mode: "Markdown" }
            );

        } catch (err) {

            console.error(err);

            bot.sendMessage(chatId,
                `❌ Error\n\n${err.message}`
            );
        }
    });

};