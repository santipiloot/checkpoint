import app from './src/app.js';
import { testConexion } from './src/config/db.js';
import { initCron } from './src/config/cron.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Servidor prendido en el puerto ${PORT}`);

    await testConexion();
    initCron();
});
