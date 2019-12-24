import investmentController from "../controllers/investmentController";
import validate from '../middlewares/validator';
import { checkToken } from '../middlewares/userMiddlewares';
import authorize from '../middlewares/authorizer';
import { processInvestment } from '../middlewares/investmentMiddleware';
import {
  startInvestmentSchema, approveInvestmentSchema
} from '../validation/investmentSchema';

const { getInvestments, getAllInvestments, getInvestment, adminGetInvestment,
  startInvestment, approveInvestment, settleInvestment } = investmentController;

const investment = (router) => {
  router.route('/investments')
    .get(checkToken, getInvestments)
    .post(checkToken, validate(startInvestmentSchema), processInvestment, startInvestment);

  router.route('/investments/:investmentId')
    .get(checkToken, validate(approveInvestmentSchema), getInvestment);
  
  router.route('/admin/investments')
    .get(checkToken, authorize('admin'), getAllInvestments);
  
  router.route('/admin/investments/:investmentId')
    .get(checkToken, authorize('admin'), validate(approveInvestmentSchema), adminGetInvestment);

  router.route('/admin/investments/:investmentId')
    .post(checkToken, authorize('admin'), validate(approveInvestmentSchema), approveInvestment);
  
  router.route('/admin/investments/:investmentId/settle')
    .post(checkToken, authorize('admin'), validate(approveInvestmentSchema), settleInvestment);
}

export default investment;