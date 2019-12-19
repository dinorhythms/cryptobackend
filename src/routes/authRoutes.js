import authController from "../controllers/authController";

const { getUsers } = authController;

const auth = (router) => {
  router.route('/auth/users')
    .get(getUsers);
}

export default auth;