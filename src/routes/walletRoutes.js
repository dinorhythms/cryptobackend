import walletController from "../controllers/walletController";
import { checkToken } from '../middlewares/userMiddlewares';

const { getWallet } = walletController;

const wallet = (router) => {
  router.route('/wallet')
    .get(checkToken, getWallet);
}

export default wallet;