import investmentController from "../controllers/investmentController";
import validate from '../middlewares/validator';
import { checkToken } from '../middlewares/userMiddlewares';
import { processInvestment } from '../middlewares/investmentMiddleware';
import {
  startInvestmentSchema
} from '../validation/investmentSchema';

const { getInvestments, startInvestment } = investmentController;

const investment = (router) => {
  router.route('/investments')
    .get(checkToken, getInvestments)
    .post(checkToken, validate(startInvestmentSchema), processInvestment, startInvestment);
}

export default investment;