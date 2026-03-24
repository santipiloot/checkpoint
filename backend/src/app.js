import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware.js';
import { passportConfig } from './config/passport.js';

const app = express();

app.use(cors());
app.use(express.json());

passportConfig();

app.get('/', (req, res) => {
    res.json({ message: 'Hola mundo' });
});

app.use(errorHandler);

export default app;
