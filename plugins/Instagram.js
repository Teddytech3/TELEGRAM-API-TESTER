const axios = require("axios");

module.exports = (bot) => {

    bot.onText(/^\/instagram (.+)/, async (msg, match) => {

        const chatId = msg.chat.id;
        const url = match[1];

        try {

            const api =
                `https://api.princetechn.com/api/download/instadl?apikey=prince&url=${encodeURIComponent(url)}`;

            const { data } = await axios.get(api);

            console.log(data);

            await bot.sendMessage(
                chatId,
                "Check terminal for API response."
            );

        } catch (err) {

            console.log(err);

            bot.sendMessage(chatId, "❌ Error");
        }
    });
};