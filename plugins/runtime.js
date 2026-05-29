module.exports = (bot) => {

    bot.onText(/^\/runtime$/, async (msg) => {

        const seconds = process.uptime();

        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        await bot.sendMessage(
            msg.chat.id,
            `⏱ Runtime\n\n${days}d ${hours}h ${mins}m ${secs}s`
        );

    });

};