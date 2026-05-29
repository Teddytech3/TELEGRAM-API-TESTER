const fs = require("fs");
const path = require("path");

module.exports = (bot) => {
    const dir = path.join(__dirname, "../plugins");

    fs.readdirSync(dir)
        .filter(file => file.endsWith(".js"))
        .forEach(file => {
            require(path.join(dir, file))(bot);
            console.log(`Loaded plugin: ${file}`);
        });
};