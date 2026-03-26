import bot from '../../config/telegram.js';

const chatId = process.env.TELEGRAM_CHAT_ID;

export const alertService = {
    async enviarMensaje(mensaje) {
        try {
            await bot.sendMessage(chatId, mensaje, { parse_mode: 'Markdown' });
            console.log('Alerta de Telegram enviada con éxito');
        } catch (error) {
            console.error('Error al enviar alerta por Telegram:', error.message);
        }
    }
};
