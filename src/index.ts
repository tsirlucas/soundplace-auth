import cors from 'cors';
import express from 'express';
import {jwtRouter, youtubeRouter} from 'routes';

const app = express();

app
  .use(cors())
  .options('*', cors())
  .use('/youtube', youtubeRouter)
  .use('/jwt', jwtRouter);

export default app;
