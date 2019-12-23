import firebaseAdmin from '../config/firebaseAdmin';
import messages from '../utils/messages';
import response, { errorResponse } from '../utils/response';

const { db } = firebaseAdmin;

const getWallet = async (req, res) => {
  try {
    let user = req.user;
    const wallet = await db.collection('wallets').doc(user.uid).get();
    return response(res, 200, 'success', { wallet: wallet.data()})
  } catch (error) {
    console.error(error);
  }
}

export default { getWallet };