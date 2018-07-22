import cors from 'cors';
import express from 'express';
import {jwtRouter, spotifyRouter} from 'routes';

const app = express();

app.use(cors());

app.options('*', cors());

// Routes

app.use('/spotify', spotifyRouter);
app.use('/jwt', jwtRouter);

export default app;
