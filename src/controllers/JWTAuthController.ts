import axios from 'axios';
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
    const creds = await YoutubeAuth.getInstance().getCreds(query.user_id);
    const isFirstAuth = !creds;
    await YoutubeAuth.getInstance().setCreds(query);
    if (isFirstAuth) {
      axios
        .get(`http://${environment.settings.dataApiUrl}/import`, {
          headers: {
            Authorization: token,
          },
        })
        .then(() => console.log('User data imported!'))
        .catch((e) => console.log(e));
    }

    res.redirect(`${environment.settings.clientUrl}/#/callback?token=${token}`);
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
