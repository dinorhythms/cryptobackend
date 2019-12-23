import authController from "../controllers/authController";
import validate from '../middlewares/validator';
import { checkToken } from '../middlewares/userMiddlewares';
import authorize from '../middlewares/authorizer';
import {
  signUpSchema, signInSchema, authorizerSchema
} from '../validation/userSchema';

const { getUsers, signUp, signin, makeUserAdmin } = authController;

const auth = (router) => {
  router.route('/auth/users')
    .get(checkToken, authorize('admin'), getUsers);

  router.route('/auth/signup')
    .post(validate(signUpSchema), signUp);

  router.route('/auth/signin')
    .post(validate(signInSchema), signin);

  router.route('/auth/makeadmin')
    .post(checkToken, authorize('admin'), validate(authorizerSchema), makeUserAdmin);
}

export default auth;