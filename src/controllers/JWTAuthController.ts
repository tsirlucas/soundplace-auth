import {environment} from 'config';
import {UserCred, YoutubeAuth} from 'db';
import {Request, Response} from 'express';
import jwt, {Secret} from 'jsonwebtoken';

export class JWTAuthController {
  private static instance: JWTAuthController;

  static getInstance() {
    if (!this.instance) {
      this.instance = new JWTAuthController();
    }

    return this.instance;
  }

  public async authenticate({query}: Request, res: Response) {
    var token = jwt.sign({user_id: query.user_id}, environment.secrets.jwtSecret as Secret);
    await YoutubeAuth.getInstance().setCreds(query);
    res.redirect(`${environment.settings.clientUrl}/#/login?token=${token}`);
  }

  public async verifyToken(req: Request, res: Response) {
    const {authorization} = req.headers;
    try {
      const decoded = jwt.verify(
        authorization as string,
        environment.secrets.jwtSecret as string,
      ) as UserCred;
      res.send({userId: decoded.user_id});
    } catch (error) {
      res.status(401).send({error});
    }
  }
}
