import {SpotifyAuth} from 'db';
import {Request, Response} from 'express';

import {SpotifyAuthService} from 'services';

export class SpotifyAuthController {
  private static instance: SpotifyAuthController;

  static getInstance() {
    if (!this.instance) {
      this.instance = new SpotifyAuthController();
    }

    return this.instance;
  }

  public async getAuthorizationUrl(_req: Request, res: Response) {
    res.redirect(await SpotifyAuthService.getInstance().getAuthorizationUrl());
  }

  public async getTokenizedUrl({query}: Request, res: Response) {
    const params = await SpotifyAuthService.getInstance().getTokenizedUrl(query.code);
    res.redirect(`../jwt/authenticate?` + params);
  }

  public async refreshToken({query}: Request, res: Response) {
    const creds = await SpotifyAuth.getInstance().getRefreshToken(query.userId);
    const newToken = await SpotifyAuthService.getInstance().getRefreshedToken(creds.refresh_token);
    await SpotifyAuth.getInstance().setToken(query.userId, newToken);
    res.send(newToken);
  }
}
