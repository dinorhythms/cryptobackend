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

const getPublicInvestments = async (req, res) => {
  try {
    const investmentRef = db.collection('publicinvestment');
    const investmentDoc = await investmentRef.get();
    const investments = [];
    if(investmentDoc.empty){
      //create
      let startDate = new Date();
      let endDate = new Date();

      const startTime = new Date(
				endDate.setDate(startDate.getDate() - 2)
      ).toISOString();

      const endTime = new Date(
				endDate.setDate(startDate.getDate() + 8)
      ).toISOString();
      
      await investmentRef.add({
        name: 'Payout',
        date: startTime,
        investmentAmount: '$3541',
        payoutTime: endTime,
        payoutAmount: '$4957.4',
        createdAt: new Date().toISOString(),
        updatedAt:  new Date().toISOString()
      })
      await investmentRef.add({
        name: 'Payout',
        date: startTime,
        investmentAmount: '$3541',
        payoutTime: endTime,
        payoutAmount: '$4957.4',
        createdAt: new Date().toISOString(),
        updatedAt:  new Date().toISOString()
      })
      const doc = await investmentRef.get();
      doc.forEach(doc => investments.push({id: doc.id, ...doc.data()}))
      return response(res, 200, 'success', { investments })
    }
    investmentDoc.forEach(doc => investments.push({id: doc.id, ...doc.data()}))
    return response(res, 200, 'success', { investments })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const updatePublicInvestment = async (req, res) => {
  try {
    const { investmentId } = req.params;
    const { name, date, investmentAmount, payoutTime, payoutAmount} = req.body;

    const investmentRef = db.collection('publicinvestment').doc(investmentId);
    const getDoc = await investmentRef.get();

    if(!getDoc.exists) return errorResponse(res, 400, 'error', 'Not allowed, Investment not found');
    const data = { 
      name,
      date,
      investmentAmount,
      payoutTime,
      payoutAmount,
      updatedAt:  new Date().toISOString()
    }
    await investmentRef.update(data);
    return response(res, 201, 'success', { message: "Public investment updated successfully!" })
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

export default { getInvestments, getInvestment, adminGetInvestment, updatePublicInvestment,
  startInvestment, getAllInvestments, approveInvestment, settleInvestment, getPublicInvestments };