import {YoutubeAuth} from 'db';
import {Request, Response} from 'express';

import {YoutubeAuthService} from 'services';

export class YoutubeAuthController {
  private static instance: YoutubeAuthController;

  static getInstance() {
    if (!this.instance) {
      this.instance = new YoutubeAuthController();
    }

    return this.instance;
  }

  public async getAuthorizationUrl(_req: Request, res: Response) {
    res.redirect(await YoutubeAuthService.getInstance().getAuthorizationUrl());
  }

  public async getTokenizedUrl({query}: Request, res: Response) {
    const params = await YoutubeAuthService.getInstance().getTokenizedUrl(query.code);
    res.redirect(`../jwt/authenticate?` + params);
  }

  public async refreshToken({query}: Request, res: Response) {
    const creds = await YoutubeAuth.getInstance().getCreds(query.userId);
    const tokens = await YoutubeAuthService.getInstance().getRefreshedToken(creds);
    await YoutubeAuth.getInstance().setCreds({user_id: query.userId, ...tokens});
    res.send(tokens.access_token);
  }
}
