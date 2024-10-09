// require('dotenv').config()
// const { search } = require('google-sr');
// const logChannelId = process.env.LOGC_ID;

// async function googleSearch(bot, chatId, query, userName) {
//   if (!query) return bot.sendMessage(chatId, `Enter your Google search query, example\n/google what is javascript`)
//   bot.sendChatAction(chatId, 'typing');
//   try {
//     const searchResults = await search({ query: query });
//     let resultS = `GOOGLE SEARCH\n\n`
//     for (let i = 0;i < 5;i++) {
//       resultS += `• Title: ${searchResults[i].title}\n• Link: ${searchResults[i].link}\n• Description: ${searchResults[i].description}\n\n`
//     };
//     return bot.sendMessage(chatId, resultS);
//   } catch (err) {
//     await bot.sendMessage(logChannelId, `[ ERROR MESSAGE ]\n\n• Username: @${userName}\n• File: funcs/google.js\n• Function: googleSearch()\n• Input: ${query}\n\n${err}`.trim());
//     return bot.sendMessage(chatId, 'An error occurred!');
//   }
// }

// module.exports = {
//   googleSearch
// }
require('dotenv').config();
import google from 'google-that';
const logChannelId = process.env.LOGC_ID;

async function googleSearch(bot, chatId, query, userName) {
  if (!query) {
    return bot.sendMessage(chatId, `Enter your Google search query, example\n/google what is javascript`);
  }

  bot.sendChatAction(chatId, 'typing');

  try {
    const searchResults = await google({ query: query });
    let resultS = `GOOGLE SEARCH\n\n`;

    for (let i = 0; i < Math.min(5, searchResults.length); i++) {  // Limit to 5 results
      resultS += `• Title: ${searchResults[i].title}\n• Link: ${searchResults[i].link}\n• Description: ${searchResults[i].snippet}\n\n`;
    }

    return bot.sendMessage(chatId, resultS);
  } catch (err) {
    await bot.sendMessage(logChannelId, `[ ERROR MESSAGE ]\n\n• Username: @${userName}\n• File: funcs/google.js\n• Function: googleSearch()\n• Input: ${query}\n\n${err}`.trim());
    return bot.sendMessage(chatId, 'An error occurred!');
  }
}

module.exports = {
  googleSearch
};
