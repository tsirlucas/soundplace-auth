import {JWTAuthController} from 'controllers';
import {Router} from 'express';

export const jwtRouter = Router();

jwtRouter
  .get('/authenticate', JWTAuthController.getInstance().authenticate)
  .get('/verify', JWTAuthController.getInstance().verifyToken);
