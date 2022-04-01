import express from 'express';
import { errorsOptions } from '../middleware';
import setupMiddleware from './middleware';
import setupRouter from './routes';

const app = express();
setupMiddleware(app);
setupRouter(app);
app.use(errorsOptions);

export default app;
