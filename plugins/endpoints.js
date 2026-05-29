module.exports = (bot) => {

    bot.onText(/^\/endpoints$/, async (msg) => {

        const chatId = msg.chat.id;

        const text = `
📡 *API TESTER ENDPOINTS*

🤖 AI
/api https://api.gifted.co.ke/api/ai/gpt4?apikey=gifted&q=hello

🎵 Song
/api https://api.princetechn.com/download/song?query=faded

🎬 TikTok
/api https://api.princetechn.com/api/download/tiktokdlv4?apikey=prince&url=LINK

📸 Instagram
/api https://api.princetechn.com/api/download/instadl?apikey=prince&url=LINK

▶️ YouTube MP3
/api https://api.princetechn.com/api/downloader/ytmp3?url=LINK

🎥 YouTube MP4
/api https://api.princetechn.com/api/downloader/ytmp4?url=LINK
`;

        await bot.sendMessage(chatId, text, {
            parse_mode: "Markdown"
        });

    });

};