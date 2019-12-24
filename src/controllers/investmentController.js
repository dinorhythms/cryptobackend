import firebaseAdmin from '../config/firebaseAdmin';
import response, { errorResponse } from '../utils/response';
import messages from '../utils/messages';

const { db } = firebaseAdmin;

const getInvestments = async (req, res) => {
  try {
    let user = req.user;
    const investmentDoc = await db.collection('investments').where('userId', '==', user.uid).get();
    const investments = [];
    investmentDoc.forEach(doc => investments.push(doc.data()))
    return response(res, 200, 'success', { investments })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

const startInvestment = async (req, res) => {
  try {
    let investment = req.investment;
    const investmentDoc = await db.collection('investments').add(investment);
    return response(res, 201, 'success', { message: messages.investmentSuccess })
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

export default { getInvestments, startInvestment };