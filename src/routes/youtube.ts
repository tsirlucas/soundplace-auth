import {YoutubeAuthController} from 'controllers';
import {Router} from 'express';

export const youtubeRouter = Router();

youtubeRouter
  .get('/', YoutubeAuthController.getInstance().getAuthorizationUrl)
  .get('/token', YoutubeAuthController.getInstance().getTokenizedUrl)
  .get('/refreshToken', YoutubeAuthController.getInstance().refreshToken);
