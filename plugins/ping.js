module.exports = (bot) => {

    bot.onText(/^\/ping$/, async (msg) => {

        const start = Date.now();

        const sent = await bot.sendMessage(
            msg.chat.id,
            "🏓 Pinging..."
        );

        const speed = Date.now() - start;

        await bot.editMessageText(
            `🏓 Pong!\n\n⚡ ${speed} ms`,
            {
                chat_id: msg.chat.id,
                message_id: sent.message_id
            }
        );

    });

};