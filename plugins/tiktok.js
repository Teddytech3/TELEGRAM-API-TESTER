const axios = require("axios");

module.exports = (bot) => {

    bot.onText(/^\/tiktok (.+)/, async (msg, match) => {

        try {

            const chatId = msg.chat.id;
            const url = match[1];

            await bot.sendMessage(chatId, "⏳ Downloading...");

            const api =
                `https://api.princetechn.com/api/download/tiktokdlv4?apikey=prince&url=${encodeURIComponent(url)}`;

            const { data } = await axios.get(api);

            console.log(data);

            const result = data.result || {};

            const videoUrl =
                result.download_url ||
                result.download ||
                result.url ||
                result.video;

            if (!videoUrl) {
                return bot.sendMessage(chatId, "❌ No video found.");
            }

            await bot.sendVideo(chatId, videoUrl, {
                caption: "✅ TikTok Downloaded"
            });

        } catch (e) {
            console.log(e);
            bot.sendMessage(msg.chat.id, "❌ Error");
        }
    });
};