import firebaseAdmin from '../config/firebaseAdmin';
import response, { errorResponse } from '../utils/response';
import messages from '../utils/messages';

const { db } = firebaseAdmin;

const getInvestments = async (req, res) => {
  try {
    let user = req.user;
    const investmentDoc = await db.collection('investments').where('userId', '==', user.uid).get();
    const investments = [];
    investmentDoc.forEach(doc => investments.push({id: doc.id, ...doc.data()}))
    return response(res, 200, 'success', { investments })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const getInvestment = async (req, res) => {
  try {
    const user = req.user;
    const { investmentId } = req.params;

    const investmentDoc = await db.collection('investments').doc(investmentId).get();
    if(!investmentDoc.exists) return errorResponse(res, 500, 'error', messages.unauthorized);
    const investment = investmentDoc.data();
    if(investment.userId != user.uid) return errorResponse(res, 500, 'error', messages.unauthorized)
    return response(res, 200, 'success', { investment })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const adminGetInvestment = async (req, res) => {
  try {
    const { investmentId } = req.params;

    const investmentDoc = await db.collection('investments').doc(investmentId).get();
    const investment = investmentDoc.data();
    return response(res, 200, 'success', { investment })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const getAllInvestments = async (req, res) => {
  try {
    let user = req.user;
    const investmentDoc = await db.collection('investments').get();
    const investments = [];
    investmentDoc.forEach(doc => investments.push({id: doc.id, ...doc.data()}))
    return response(res, 200, 'success', { investments })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const startInvestment = async (req, res) => {
  try {
    const investment = req.investment;
    const investmentDoc = await db.collection('investments').add(investment);
    return response(res, 201, 'success', { message: messages.investmentSuccess })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const approveInvestment = async (req, res) => {
  try {
    const { investmentId } = req.params;
    const startDate = new Date();
    const endDate = new Date();

    const investmentRef = await db.collection('investments').doc(investmentId);
    const getDoc = await investmentRef.get();
    const investment = getDoc.data();

    //check if approved already
    if(investment.status === 'running') return errorResponse(res, 400, 'error', 'Not allowed, Investment already running');

    // get plan
    const planDoc = await db.collection('plans').doc(investment.planId).get();
    const plan = planDoc.data();
    await investmentRef.update(
        { 
          status: 'running',
          startTime: startDate.toISOString(),
          endTime: new Date(endDate.setDate(startDate.getDate() + +plan.investmentTime)).toISOString(),
          updatedAt:  new Date().toISOString()
        }
      );
    return response(res, 201, 'success', { message: messages.approvalSuccess })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const settleInvestment = async (req, res) => {
  try {
    const { investmentId } = req.params;

    const investmentRef = await db.collection('investments').doc(investmentId);
    const getDoc = await investmentRef.get();
    const investment = getDoc.data();

    // check if its time to settle
    if(investment.endTime < new Date().toISOString()) return errorResponse(res, 400, 'error', messages.notAllowed)

    //check if settled already
    if(investment.status === 'settled') return errorResponse(res, 400, 'error', 'Not allowed, Investment already settled');
    
    //update wallet
    const userId = investment.userId;
    const walletRef = await db.collection('wallets').doc(userId);
    const walletDoc = await walletRef.get();
    const wallet = walletDoc.data();
    await walletRef.update(
      { 
        balance: wallet.balance + +investment.total,
        totalProfit: wallet.totalProfit + +investment.profit,
        updatedAt:  new Date().toISOString()
      }
    );

    //update investment as settled
    await investmentRef.update(
        { 
          status: 'settled',
          updatedAt:  new Date().toISOString()
        }
      );
    return response(res, 201, 'success', { message: messages.settledSuccess })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}


export default { getInvestments, getInvestment, adminGetInvestment,
  startInvestment, getAllInvestments, approveInvestment, settleInvestment };