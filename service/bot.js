const TelegramBot = require("node-telegram-bot-api");
const userService = require("./user");
const { telegramToken } = require("../config");

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(telegramToken, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/start/, (msg, match) => {
  userService.create({ channel: msg.chat.id, username: msg.chat.username });

  bot.sendMessage(msg.chat.id, "Welcome to us!!!");
  bot.sendMessage(
    msg.chat.id,
    `Your telegram username is ${msg.chat.username}`
  );
});

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on("message", (msg) => {
//   console.log(msg.chat.id);
//   userService.create({
//     channel: msg.chat.id,
//     name: msg.chat.username,
//   });

//   bot.sendMessage(msg.chat.id, "Welcome to us!!!");
// });

module.exports = bot;
