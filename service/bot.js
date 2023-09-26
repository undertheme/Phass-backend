const TelegramBot = require("node-telegram-bot-api");
const userService = require("../service/user");
const { telegramToken } = require("../config");

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(telegramToken, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  userService.create({ chatId: msg.chat.id, username: msg.chat.username });

  bot.sendMessage(chatId, "Welcome to us!!!");
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", (msg) => {
  userService.create({ chatId: msg.chat.id, username: msg.chat.username });

  bot.sendMessage(chatId, "Welcome to us!!!");
});

module.exports = bot;
