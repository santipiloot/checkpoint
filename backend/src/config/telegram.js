import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
    console.warn('ADVERTENCIA: TELEGRAM_BOT_TOKEN no definido en .env');
}

const bot = new TelegramBot(token, { polling: false });

export default bot;
