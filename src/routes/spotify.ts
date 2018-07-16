import {Router} from 'express';

import {SpotifyAuthController} from 'src/controllers';

export const spotifyRouter = Router();

spotifyRouter.get('/', SpotifyAuthController.getInstance().getAuthorizationUrl);

spotifyRouter.get('/token', SpotifyAuthController.getInstance().getTokenizedUrl);
