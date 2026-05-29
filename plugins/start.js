module.exports = (bot) => {

    bot.onText(/^\/start$/, async (msg) => {

        const chatId = msg.chat.id;
        const firstName = msg.from.first_name || "User";

        const text = `
👋 Welcome ${firstName}

🤖 *Telegram Downloader Bot*

Available Commands:

📱 /tiktok <url>
📸 /instagram <url>
🎬 /youtube <url>
🎵 /play <song name>
📘 /facebook <url>

Example:

/play Not Like Us

Powered by TEDDY-XMD ⚡
`;

        await bot.sendMessage(chatId, text, {
            parse_mode: "Markdown"
        });

    });

};