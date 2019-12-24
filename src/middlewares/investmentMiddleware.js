import firebaseAdmin from '../config/firebaseAdmin';
import firebaseClient from '../config/firebaseClient';
import { errorResponse } from '../utils/response';
import messages from '../utils/messages';

const {
  badPlanId, amountOutOfRange
} = messages;

const { db } = firebaseAdmin;

/**
 * @method checkToken
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {Object} response object
 */
export const processInvestment = async (req, res, next) => {
  const { amount, planId } = req.body;
  try {
    const planDoc = await db.collection('plans').doc(planId).get();
    const plan = planDoc.data();
    if(!plan) return errorResponse(res, 400, 'error', badPlanId);
    if(amount < plan.minimum || amount > plan.maximum ) return errorResponse(res, 400, 'error', amountOutOfRange);

    // get account to pay to
    const accountDoc = await db.collection('accounts').get();
    const account = [];
    accountDoc.forEach(doc => account.push(doc.data()));

    //process investment
    const startDate = new Date();
    const endDate = new Date();
    req.investment = {
      userId: req.user.uid,
      planId,
      amount,
      profit: (((+amount*+plan.percentage)/100) - +amount).toFixed(2),
      total: ((+amount*+plan.percentage)/100).toFixed(2),
      startTime: startDate.toISOString(),
      endTime: new Date(endDate.setDate(startDate.getDate() + +plan.investmentTime)).toISOString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      payToAccount: account[Math.floor(Math.random() * Math.floor(2))]
    }

    return next();
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message);
  }
};
