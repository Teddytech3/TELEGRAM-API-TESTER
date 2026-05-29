const axios = require("axios");

module.exports = (bot) => {

    bot.onText(/^\/play (.+)/, async (msg, match) => {

        const chatId = msg.chat.id;
        const query = match[1];

        try {

            await bot.sendMessage(chatId, `🔎 Searching: ${query}`);

            const api =
                `https://api.princetechn.com/download/song?query=${encodeURIComponent(query)}`;

            const { data } = await axios.get(api);

            console.log(data);

            if (!data.status || !data.result) {
                return bot.sendMessage(chatId, "❌ Song not found.");
            }

            const song = data.result;

            await bot.sendAudio(chatId, song.download_url, {
                caption:
`🎵 ${song.title || "Unknown"}

👤 ${song.artist || "Unknown"}

⚡ Powered by Telegram Downloader Bot`
            });

        } catch (err) {

            console.error(err);

            bot.sendMessage(chatId, "❌ Failed to download audio.");
        }
    });
};