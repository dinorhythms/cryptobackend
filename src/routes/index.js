import auth from './authRoutes';

const routes = (router) => {

  router.route('/').get((req, res) => {
    res.send('welcome to crypto api root endpoint');
  })

  auth(router);

}

export default routes;