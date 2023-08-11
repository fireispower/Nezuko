require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api')

const downloadFromYoutube = require('./funcs/youtube')
const {
	downloadInstagramPost,
	downloadInstagramStory,
} = require('./funcs/instagram')

const token = process.env.TOKEN
const bot = new TelegramBot(token, { polling: true })

// help
bot.onText(/\/help/, (msg) => {
	const chatId = msg.chat.id
	const resp = 'Help message'

	bot.sendMessage(chatId, resp)
})

// match youtube link
bot.onText(
	/(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/,
	async (msg, match) => {
		const chatId = msg.chat.id
		const url = match[0]

		await downloadFromYoutube(bot, chatId, url)
	}
)

// match instagram post link
bot.onText(
	/(https?:\/\/)?(www\.)?(instagram\.com|instagr\.?am)\/p\/.+/,
	(msg, match) => {
		const chatId = msg.chat.id
		const url = match[0]

		downloadInstagramPost(bot, chatId, url)
	}
)

// match instagram story link
// bot.onText(
// 	/(https?:\/\/)?(www\.)?(instagram\.com|instagr\.?am)\/stories\/.+/,
// 	(msg, match) => {
// 		const chatId = msg.chat.id
// 		const url = match[0]

// 		downloadInstagramStory(bot, chatId, url)
// 	}
// )

// match instagram reel link
bot.onText(
	/(https?:\/\/)?(www\.)?(instagram\.com|instagr\.?am)\/reel\/.+/,
	(msg, match) => {
		const chatId = msg.chat.id
		const url = match[0]

		downloadInstagramPost(bot, chatId, url)
	}
)
