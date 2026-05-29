const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const path = require("path");

const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
console.error("❌ BOT_TOKEN not found");
process.exit(1);
}

const bot = new TelegramBot(TOKEN, {
polling: true
});

// =========================
// START COMMAND
// =========================

bot.onText(/^/start$/, async (msg) => {

try {

    await bot.sendPhoto(
        msg.chat.id,
        "https://files.catbox.moe/13nyhx.jpg",
        {
            caption:

`🤖 TEDDY-XMD DOWNLOADER BOT

Welcome to the ultimate Downloader & API Testing Bot.

━━━━━━━━━━━━━━━
📥 Downloaders
🤖 AI Features
🧪 API Tester
🖥 Server Tools
━━━━━━━━━━━━━━━

Choose an option below:`,

            parse_mode: "Markdown",

            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "📥 Downloaders",
                            callback_data: "downloaders"
                        },
                        {
                            text: "🤖 AI",
                            callback_data: "ai"
                        }
                    ],
                    [
                        {
                            text: "🧪 API Tester",
                            callback_data: "apitester"
                        },
                        {
                            text: "🖥 System",
                            callback_data: "system"
                        }
                    ],
                    [
                        {
                            text: "📚 Help",
                            callback_data: "help"
                        }
                    ],
                    [
                        {
                            text: "🌐 Channel",
                            url: "https://whatsapp.com/channel/0029Vb6NveDBPzjPa4vIRt3n"
                        }
                    ]
                ]
            }
        }
    );

} catch (err) {
    console.error(err);
}

});

// =========================
// BUTTON HANDLER
// =========================

bot.on("callback_query", async (query) => {

const chatId = query.message.chat.id;
const data = query.data;

try {

    switch (data) {

        case "downloaders":

            await bot.sendMessage(
                chatId,

`📥 DOWNLOADERS

/tiktok <url>
/instagram <url>
/facebook <url>
/youtube <url>
/play <song>`,
{ parse_mode: "Markdown" }
);

            break;

        case "ai":

            await bot.sendMessage(
                chatId,

`🤖 AI COMMANDS

/ai hello
/gpt tell me a joke
/code create express server`,
{ parse_mode: "Markdown" }
);

            break;

        case "apitester":

            await bot.sendMessage(
                chatId,

`🧪 API TESTER

/api <url>

/endpoints`,
{ parse_mode: "Markdown" }
);

            break;

        case "system":

            await bot.sendMessage(
                chatId,

`🖥 SYSTEM COMMANDS

/ping
/runtime
/server
/logs`,
{ parse_mode: "Markdown" }
);

            break;

        case "help":

            await bot.sendMessage(
                chatId,

`📚 HELP

Example:

/play Not Like Us
/tiktok <url>
/instagram <url>`,
{ parse_mode: "Markdown" }
);

            break;
    }

    await bot.answerCallbackQuery(query.id);

} catch (err) {

    console.error(err);

    await bot.answerCallbackQuery(query.id, {
        text: "Error"
    });

}

});

// =========================
// AUTO LOAD PLUGINS
// =========================

const pluginsDir = path.join(__dirname, "plugins");

if (fs.existsSync(pluginsDir)) {

fs.readdirSync(pluginsDir)
    .filter(file => file.endsWith(".js"))
    .forEach(file => {

        try {

            require(path.join(pluginsDir, file))(bot);

            console.log(`✅ Loaded: ${file}`);

        } catch (err) {

            console.error(`❌ Failed: ${file}`);
            console.error(err);

        }

    });

}

// =========================
// READY
// =========================

console.log("🚀 TEDDY-XMD Telegram Bot Started");