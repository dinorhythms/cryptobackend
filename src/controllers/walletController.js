import firebaseAdmin from '../config/firebaseAdmin';
import response, { errorResponse } from '../utils/response';

const { db } = firebaseAdmin;

const getWallet = async (req, res) => {
  try {
    let user = req.user;
    const wallet = await db.collection('wallets').doc(user.uid).get();
    return response(res, 200, 'success', { wallet: wallet.data()})
  } catch (error) {
    return errorResponse(res, 500, 'error', error.message)
  }
}

export default { getWallet };