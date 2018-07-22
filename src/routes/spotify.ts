import {SpotifyAuthController} from 'controllers';
import {Router} from 'express';

export const spotifyRouter = Router();

spotifyRouter.get('/', SpotifyAuthController.getInstance().getAuthorizationUrl);

spotifyRouter.get('/token', SpotifyAuthController.getInstance().getTokenizedUrl);

spotifyRouter.get('/refreshToken', SpotifyAuthController.getInstance().refreshToken);
