import cors from 'cors';
import express from 'express';
import {spotifyRouter} from 'routes';

const app = express();

app.use(cors());

app.options('*', cors());

// Routes

app.use('/spotify', spotifyRouter);

export default app;
