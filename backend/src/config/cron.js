import cron from 'node-cron';
import { verificarStockCritico } from '../shared/services/alert.service.js';

export const initCron = () => {

    // El 0 * * * * es cada hora, para pruebas ponerlo en * * * * * para que se envien cada minuto
    cron.schedule('0 */4 * * *', async () => {
        try {
            await verificarStockCritico();
        } catch (error) {
            console.error('Error en tarea cron:', error.message);
        }
    });

};
