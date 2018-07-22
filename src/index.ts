import cors from 'cors';
import express from 'express';
import {jwtRouter, spotifyRouter} from 'routes';

const app = express();

app
  .use(cors())
  .options('*', cors())
  .use('/spotify', spotifyRouter)
  .use('/jwt', jwtRouter);

export default app;
