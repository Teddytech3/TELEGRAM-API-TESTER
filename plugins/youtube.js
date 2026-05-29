const axios = require("axios");

module.exports = (bot) => {

    bot.onText(/^\/youtube (.+)/, async (msg, match) => {

        const chatId = msg.chat.id;
        const url = match[1];

        try {

            await bot.sendMessage(chatId, "⏳ Downloading YouTube video...");

            const api =
                `https://api.princetechn.com/api/downloader/ytmp4?url=${encodeURIComponent(url)}`;

            const { data } = await axios.get(api);

            console.log(data);

            const result = data.result || {};

            const videoUrl =
                result.download_url ||
                result.download ||
                result.url;

            if (!videoUrl) {
                return bot.sendMessage(chatId, "❌ Video not found.");
            }

            await bot.sendVideo(chatId, videoUrl, {
                caption: result.title || "✅ YouTube Video"
            });

        } catch (err) {

            console.error(err);

            bot.sendMessage(chatId, "❌ Failed to download video.");
        }
    });
};