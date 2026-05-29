const axios = require("axios");

module.exports = (bot) => {

    bot.onText(/^\/ai (.+)/, async (msg, match) => {

        const chatId = msg.chat.id;
        const prompt = match[1];

        try {

            await bot.sendMessage(chatId, "🤖 Thinking...");

            const { data } = await axios.get(
                `https://api.gifted.co.ke/api/ai/gpt4?apikey=gifted&q=${encodeURIComponent(prompt)}`
            );

            const response =
                data.result ||
                data.response ||
                data.message ||
                "No response.";

            await bot.sendMessage(chatId, response);

        } catch (err) {

            console.error(err);

            await bot.sendMessage(
                chatId,
                "❌ Failed to get AI response."
            );
        }
    });

};