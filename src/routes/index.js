import auth from './authRoutes';
import wallet from './walletRoutes';

const routes = (router) => {

  router.route('/').get((req, res) => {
    res.send('welcome to crypto api root endpoint');
  })

  auth(router);
  wallet(router);

}

export default routes;