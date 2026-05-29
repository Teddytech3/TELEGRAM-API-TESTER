const axios = require("axios");

module.exports = (bot) => {

    bot.onText(/^\/api (.+)/, async (msg, match) => {

        const chatId = msg.chat.id;
        const url = match[1].trim();

        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            return bot.sendMessage(
                chatId,
                "❌ Please provide a valid URL.\n\nExample:\n/api https://api.github.com"
            );
        }

        try {

            await bot.sendMessage(
                chatId,
                "🔍 Fetching API response..."
            );

            const { data } = await axios.get(url, {
                timeout: 30000,
                headers: {
                    "User-Agent": "Mozilla/5.0"
                }
            });

            const response = JSON.stringify(data, null, 2);

            if (response.length > 4000) {

                return bot.sendDocument(
                    chatId,
                    Buffer.from(response),
                    {},
                    {
                        filename: "response.json",
                        contentType: "application/json"
                    }
                );
            }

            await bot.sendMessage(
                chatId,
                `\`\`\`json\n${response}\n\`\`\``,
                {
                    parse_mode: "Markdown"
                }
            );

        } catch (err) {

            console.error("API ERROR:", err);

            const status = err.response?.status || "Unknown";
            const message =
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.message;

            await bot.sendMessage(
                chatId,
                `❌ API Request Failed\n\nStatus: ${status}\nMessage: ${message}`
            );
        }
    });

};