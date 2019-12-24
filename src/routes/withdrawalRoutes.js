import withdrawalController from "../controllers/withdrawalController";
import validate from '../middlewares/validator';
import { checkToken } from '../middlewares/userMiddlewares';
import authorize from '../middlewares/authorizer';
import { processWithdrawal } from '../middlewares/withdrawalMiddleware';
import {
  withdrawalSchema, requestWithdrawalSchema
} from '../validation/withdrawalSchema';

const { getWithdrawals, getAllWithdrawals, getWithdrawal, adminGetWithdrawal,
  startWithdrawal, approveWithdrawal, settleWithdrawal } = withdrawalController;

const withdrawal = (router) => {
  router.route('/withdrawals')
    .get(checkToken, getWithdrawals)
    .post(checkToken, validate(requestWithdrawalSchema), processWithdrawal, startWithdrawal);

  router.route('/withdrawals/:withdrawalId')
    .get(checkToken, validate(withdrawalSchema), getWithdrawal);
  
  router.route('/admin/withdrawals')
    .get(checkToken, authorize('admin'), getAllWithdrawals);
  
  router.route('/admin/withdrawals/:withdrawalId')
    .get(checkToken, authorize('admin'), validate(withdrawalSchema), adminGetWithdrawal);

  router.route('/admin/withdrawals/:withdrawalId')
    .post(checkToken, authorize('admin'), validate(withdrawalSchema), approveWithdrawal);
  
  router.route('/admin/withdrawals/:withdrawalId/settle')
    .post(checkToken, authorize('admin'), validate(withdrawalSchema), settleWithdrawal);
}

export default withdrawal;