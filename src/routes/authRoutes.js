import authController from "../controllers/authController";
import validate from '../middlewares/validator';
import {
  signUpSchema
} from '../validation/userSchema';

const { getUsers, signUp } = authController;

const auth = (router) => {
  router.route('/auth/users')
    .get(getUsers);

  router.route('/auth/signup')
    .post(validate(signUpSchema), signUp);
}

export default auth;