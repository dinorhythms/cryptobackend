import walletController from "../controllers/walletController";
import validate from '../middlewares/validator';
import { checkToken } from '../middlewares/userMiddlewares';
import authorize from '../middlewares/authorizer';
import {
  signUpSchema, signInSchema, authorizerSchema
} from '../validation/userSchema';

const { getWallet } = walletController;

const wallet = (router) => {
  router.route('/wallet')
    .get(checkToken, getWallet);

  // router.route('/wallet')
  //   .post(authorize('admin'), signUp);

  // router.route('/wallet')
  //   .patch(authorize('admin'), signin);
}

export default wallet;