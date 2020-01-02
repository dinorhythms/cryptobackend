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
export const processWithdrawal = async (req, res, next) => {
  const { amount, bankName, accountName, accountNo } = req.body;
  const userId = req.user.uid;
  try {
    const walletRef = await db.collection('wallets').doc(userId);
    const walletDoc = await walletRef.get();
    const wallet = walletDoc.data();
    if(amount > wallet.balance) return errorResponse(res, 400, 'error', amountOutOfRange);

    //process withdrawal
    req.withdrawal = {
      userId: req.user.uid,
      amount,
      bankName,
      accountName,
      accountNo,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return next();
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message);
  }
};
