import authController from "../controllers/authController";
import validate from '../middlewares/validator';
import {
  signUpSchema, signInSchema
} from '../validation/userSchema';

const { getUsers, signUp, signin } = authController;

const auth = (router) => {
  router.route('/auth/users')
    .get(getUsers);

  router.route('/auth/signup')
    .post(validate(signUpSchema), signUp);

  router.route('/auth/signin')
    .post(validate(signInSchema), signin);
}

export default auth;