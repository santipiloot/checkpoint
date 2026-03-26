import cron from 'node-cron';
import { verificarStockCritico } from '../shared/services/alert.service.js';

export const initCron = () => {

    // El 0 * * * * es cada hora, para pruebas ponerlo en * * * * * para que se envien cada minuto
    cron.schedule('0 * * * *', async () => {
        try {
            console.log('Ejecutando tarea cron: Verificación de stock crítico');
            await verificarStockCritico();
            console.log('Tarea cron finalizada con éxito.');
        } catch (error) {
            console.error('Error en tarea cron:', error.message);
        }
    });

    console.log('Cron jobs inicializados correctamente.');
};
