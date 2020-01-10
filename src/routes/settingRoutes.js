import settingController from "../controllers/settingController";
import validate from '../middlewares/validator';
import { checkToken } from '../middlewares/userMiddlewares';
import authorize from '../middlewares/authorizer';
import {
  planIdSchema, updatePlanSchema, createAccountSchema, accountIdSchema, 
  updateAccountSchema, settingsSchema
} from '../validation/settingSchema';

const { getPlans, getPlan, getAccounts, updateAccount, updateSettings, getStates,
   getCountries, updatePlan, createAccount, getCities } = settingController;

const setting = (router) => {

  router.route('/plans')
    .get(getPlans);

  router.route('/signup/countries')
    .get(getCountries);

  router.route('/signup/states/:countryCode')
    .get(getStates);

  router.route('/signup/cities/:countryCode/:region')
    .get(getCities);    

  router.route('/plans/:planId')
    .get(validate(planIdSchema), getPlan);

  router.route('/admin/plans/:planId')
    .patch(checkToken, authorize('admin'), validate(updatePlanSchema), updatePlan)

  router.route('/admin/accounts')
    .get(checkToken, authorize('admin'), getAccounts)
    .post(checkToken, authorize('admin'), validate(createAccountSchema), createAccount);

  router.route('/admin/accounts/:accountId')
    .patch(checkToken, authorize('admin'), validate(updateAccountSchema), updateAccount);

  router.route('/admin/settings')
    .patch(checkToken, authorize('admin'), validate(settingsSchema), updateSettings);

}

export default setting;