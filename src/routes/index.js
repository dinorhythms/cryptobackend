import auth from './authRoutes';
import wallet from './walletRoutes';
import investment from './investmentRoutes';
import withdrawal from './withdrawalRoutes';
import setting from './settingRoutes';

const routes = (router) => {

  router.route('/').get((req, res) => {
    res.send('welcome to crypto api root endpoint');
  })

  auth(router);
  wallet(router);
  investment(router);
  withdrawal(router);
  setting(router);

}

export default routes;