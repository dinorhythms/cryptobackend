import firebaseAdmin from '../config/firebaseAdmin';
import firebaseClient from '../config/firebaseClient';
import { errorResponse } from '../utils/response';
import messages from '../utils/messages';

const {
  invalidToken, noToken
} = messages;

const { db, auth } = firebaseAdmin;
const { clientAuth } = firebaseClient;

/**
 * @method checkToken
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {Object} response object
 */
export const checkToken = async (req, res, next) => {
  let token;

  try {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
      token = req.headers.authorization.split('Bearer ')[1];
      const decoded = await auth.verifyIdToken(token);
      req.user = decoded;
      return next();
    }
    return errorResponse(res, 401, 'error', noToken);
  } catch (error) {
    if(error.code === 'auth/argument-error'){
      return errorResponse(res, 401, 'error', invalidToken);
    }
    return errorResponse(res, 500, 'error', error.code);
  }
};
