"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processWithdrawal = void 0;

var _firebaseAdmin = _interopRequireDefault(require("../config/firebaseAdmin"));

var _firebaseClient = _interopRequireDefault(require("../config/firebaseClient"));

var _response = require("../utils/response");

var _messages = _interopRequireDefault(require("../utils/messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  badPlanId,
  amountOutOfRange
} = _messages.default;
const {
  db
} = _firebaseAdmin.default;
/**
 * @method checkToken
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {Object} response object
 */

const processWithdrawal = async (req, res, next) => {
  const {
    amount,
    bankName,
    accountName,
    accountNo
  } = req.body;
  const userId = req.user.uid;

  try {
    const walletRef = await db.collection('wallets').doc(userId);
    const walletDoc = await walletRef.get();
    const wallet = walletDoc.data();
    if (amount > wallet.balance) return (0, _response.errorResponse)(res, 400, 'error', amountOutOfRange); //process withdrawal

    req.withdrawal = {
      userId: req.user.uid,
      btcAddress,
      amount,
      bankName,
      accountName,
      accountNo,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return next();
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

exports.processWithdrawal = processWithdrawal;