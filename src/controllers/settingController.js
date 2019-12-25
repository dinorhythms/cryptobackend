import firebaseAdmin from '../config/firebaseAdmin';
import response, { errorResponse } from '../utils/response';
import messages from '../utils/messages';

const { db } = firebaseAdmin;

const getPlans = async (req, res) => {
  try {
    const planDoc = await db.collection('plans').get();
    const plans = [];
    planDoc.forEach(doc => plans.push({id: doc.id, ...doc.data()}))
    return response(res, 200, 'success', { plans })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const getPlan = async (req, res) => {
  try {
    const { planId } = req.params;

    const planDoc = await db.collection('plans').doc(planId).get();
    if(!planDoc.exists) return errorResponse(res, 500, 'error', messages.unauthorized);
    const plan = planDoc.data();
    return response(res, 200, 'success', { id:planDoc.id, ...plan })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const updatePlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const { name, description, minimum, maximum, percentage, investmentTime } = req.body;
    const planRef = await db.collection('plans').doc(planId);
    await planRef.update({
      planId,
      name,
      description,
      minimum,
      maximum,
      percentage,
      investmentTime,
      updatedAt: new Date().toISOString(),
    })
    return response(res, 201, 'success', { message: messages.planUpdated })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const createAccount = async (req, res) => {
  try {
    const { name, accountNo } = req.body;

    const accountRef = db.collection('accounts');
    const getDoc = await accountRef.where('accountNo', '==', accountNo).get();

    //check if exists already
    if(!getDoc.empty) return errorResponse(res, 400, 'error', 'Not allowed, account already exists');

    await accountRef.add(
        { 
          name,
          accountNo,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      );
    return response(res, 201, 'success', { message: messages.accountCreated })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const getAccounts = async (req, res) => {
  try {
    const accountDoc = await db.collection('accounts').get();
    if(accountDoc.empty) return errorResponse(res, 500, 'error', { message: 'No record found' });
    let account = [];
    accountDoc.forEach( doc => account.push({ id: doc.id, ...doc.data() }))
    return response(res, 200, 'success', { account })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const updateAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { name, accountNo } = req.body;
    const accountRef = db.collection('accounts').doc(accountId);
    await accountRef.update({
      name,
      accountNo,
      updatedAt: new Date().toISOString(),
    })
    return response(res, 201, 'success', { message: messages.accountUpdated })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const updateSettings = async (req, res) => {
  try {
    const { currency, currencySign } = req.body;
    const settingRef = db.collection('settings').doc('settings');
    await settingRef.update({
      currency,
      currencySign,
      updatedAt: new Date().toISOString(),
    })
    return response(res, 201, 'success', { message: messages.settingsUpdated })
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

export default { getPlans, getPlan, adminGetWithdrawal, updateAccount, updateSettings,
  updatePlan, createAccount, getAccounts, getAllWithdrawals, approveWithdrawal, settleWithdrawal };