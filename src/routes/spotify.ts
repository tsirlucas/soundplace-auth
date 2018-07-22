import {SpotifyAuthController} from 'controllers';
import {Router} from 'express';

export const spotifyRouter = Router();

spotifyRouter
  .get('/', SpotifyAuthController.getInstance().getAuthorizationUrl)
  .get('/token', SpotifyAuthController.getInstance().getTokenizedUrl)
  .get('/refreshToken', SpotifyAuthController.getInstance().refreshToken);
