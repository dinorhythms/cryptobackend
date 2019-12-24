import firebaseAdmin from '../config/firebaseAdmin';
import response, { errorResponse } from '../utils/response';
import messages from '../utils/messages';

const { db } = firebaseAdmin;

const getWithdrawals = async (req, res) => {
  try {
    let user = req.user;
    const withdrawalDoc = await db.collection('withdrawals').where('userId', '==', user.uid).get();
    const withdrawals = [];
    withdrawalDoc.forEach(doc => withdrawals.push({id: doc.id, ...doc.data()}))
    return response(res, 200, 'success', { withdrawals })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const getWithdrawal = async (req, res) => {
  try {
    const user = req.user;
    const { withdrawalId } = req.params;

    const withdrawalDoc = await db.collection('withdrawals').doc(withdrawalId).get();
    if(!withdrawalDoc.exists) return errorResponse(res, 500, 'error', messages.unauthorized);
    const withdrawal = withdrawalDoc.data();
    if(withdrawal.userId != user.uid) return errorResponse(res, 500, 'error', messages.unauthorized)
    return response(res, 200, 'success', { withdrawal })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const adminGetWithdrawal = async (req, res) => {
  try {
    const { withdrawalId } = req.params;

    const withdrawalDoc = await db.collection('withdrawals').doc(withdrawalId).get();
    const withdrawal = withdrawalDoc.data();
    return response(res, 200, 'success', {id: withdrawalId, ...withdrawal })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const getAllWithdrawals = async (req, res) => {
  try {
    let user = req.user;
    const withdrawalDoc = await db.collection('withdrawals').get();
    const withdrawals = [];
    withdrawalDoc.forEach(doc => withdrawals.push({id: doc.id, ...doc.data()}))
    return response(res, 200, 'success', { withdrawals })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const startWithdrawal = async (req, res) => {
  try {
    const userId = req.user.uid;
    const withdrawal = req.withdrawal;

    const walletRef = await db.collection('wallets').doc(userId);
    const walletDoc = await walletRef.get();
    const wallet = walletDoc.data();
    await walletRef.update({
      balance: +wallet.balance - +withdrawal.amount,
      totalWithdraw: +wallet.totalWithdraw + +withdrawal.amount,
      updatedAt: new Date().toISOString(),
    })
    await db.collection('withdrawals').add(withdrawal);
    return response(res, 201, 'success', { message: messages.withdrawalSuccess })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const approveWithdrawal = async (req, res) => {
  try {
    const { withdrawalId } = req.params;

    const withdrawalRef = await db.collection('withdrawals').doc(withdrawalId);
    const getDoc = await withdrawalRef.get();
    const withdrawal = getDoc.data();

    //check if approved already
    if(withdrawal.status === 'processing' || withdrawal.status === 'settled') return errorResponse(res, 400, 'error', 'Not allowed, withdrawal already processing');

    await withdrawalRef.update(
        { 
          status: 'processing',
          updatedAt:  new Date().toISOString()
        }
      );
    return response(res, 201, 'success', { message: messages.withdrawalApprovalSuccess })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const settleWithdrawal = async (req, res) => {
  try {
    const { withdrawalId } = req.params;

    const withdrawalRef = await db.collection('withdrawals').doc(withdrawalId);
    const getDoc = await withdrawalRef.get();
    const withdrawal = getDoc.data();

    //check if settled already
    if(withdrawal.status === 'settled') return errorResponse(res, 400, 'error', 'Not allowed, withdrawal already settled');

    //update investment as settled
    await withdrawalRef.update(
        { 
          status: 'settled',
          updatedAt:  new Date().toISOString()
        }
      );
    return response(res, 201, 'success', { message: messages.settledWithdrawalSuccess })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

export default { getWithdrawals, getWithdrawal, adminGetWithdrawal,
  startWithdrawal, getAllWithdrawals, approveWithdrawal, settleWithdrawal };