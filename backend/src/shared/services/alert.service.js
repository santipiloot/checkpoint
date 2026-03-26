import bot from '../../config/telegram.js';
import { obtenerProductos } from '../../modulos/productos/productos.repository.js';
import { plantillaMensaje } from '../utils/plantillaMensaje.js';

const chatId = process.env.TELEGRAM_CHAT_ID;

export const enviarMensaje = async (mensaje) => {
    try {
        await bot.sendMessage(chatId, mensaje, { parse_mode: 'Markdown' });
        console.log('Alerta de Telegram enviada con éxito');
    } catch (error) {
        console.error('Error al enviar alerta por Telegram:', error.message);
    }
}

export const verificarStockCritico = async () => {
    try {
        const productos = await obtenerProductos({ stock_critico: true });

        if (productos.length > 0) {
            const mensaje = plantillaMensaje(productos);
            await enviarMensaje(mensaje);
        } else {
            console.log('No se detectaron productos con stock crítico');
        }
    } catch (error) {
        console.error('Error en verificarStockCritico:', error.message);
    }
}
