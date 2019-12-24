"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _firebaseAdmin = _interopRequireDefault(require("../config/firebaseAdmin"));

var _response = _interopRequireWildcard(require("../utils/response"));

var _messages = _interopRequireDefault(require("../utils/messages"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  db
} = _firebaseAdmin.default;

const getWithdrawals = async (req, res) => {
  try {
    let user = req.user;
    const withdrawalDoc = await db.collection('withdrawals').where('userId', '==', user.uid).get();
    const withdrawals = [];
    withdrawalDoc.forEach(doc => withdrawals.push({
      id: doc.id,
      ...doc.data()
    }));
    return (0, _response.default)(res, 200, 'success', {
      withdrawals
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const getWithdrawal = async (req, res) => {
  try {
    const user = req.user;
    const {
      withdrawalId
    } = req.params;
    const withdrawalDoc = await db.collection('withdrawals').doc(withdrawalId).get();
    if (!withdrawalDoc.exists) return (0, _response.errorResponse)(res, 500, 'error', _messages.default.unauthorized);
    const withdrawal = withdrawalDoc.data();
    if (withdrawal.userId != user.uid) return (0, _response.errorResponse)(res, 500, 'error', _messages.default.unauthorized);
    return (0, _response.default)(res, 200, 'success', {
      withdrawal
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const adminGetWithdrawal = async (req, res) => {
  try {
    const {
      withdrawalId
    } = req.params;
    const withdrawalDoc = await db.collection('withdrawals').doc(withdrawalId).get();
    const withdrawal = withdrawalDoc.data();
    return (0, _response.default)(res, 200, 'success', {
      id: withdrawalId,
      ...withdrawal
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const getAllWithdrawals = async (req, res) => {
  try {
    let user = req.user;
    const withdrawalDoc = await db.collection('withdrawals').get();
    const withdrawals = [];
    withdrawalDoc.forEach(doc => withdrawals.push({
      id: doc.id,
      ...doc.data()
    }));
    return (0, _response.default)(res, 200, 'success', {
      withdrawals
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

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
      updatedAt: new Date().toISOString()
    });
    await db.collection('withdrawals').add(withdrawal);
    return (0, _response.default)(res, 201, 'success', {
      message: _messages.default.withdrawalSuccess
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const approveWithdrawal = async (req, res) => {
  try {
    const {
      withdrawalId
    } = req.params;
    const withdrawalRef = await db.collection('withdrawals').doc(withdrawalId);
    const getDoc = await withdrawalRef.get();
    const withdrawal = getDoc.data(); //check if approved already

    if (withdrawal.status === 'processing' || withdrawal.status === 'settled') return (0, _response.errorResponse)(res, 400, 'error', 'Not allowed, withdrawal already processing');
    await withdrawalRef.update({
      status: 'processing',
      updatedAt: new Date().toISOString()
    });
    return (0, _response.default)(res, 201, 'success', {
      message: _messages.default.withdrawalApprovalSuccess
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const settleWithdrawal = async (req, res) => {
  try {
    const {
      withdrawalId
    } = req.params;
    const withdrawalRef = await db.collection('withdrawals').doc(withdrawalId);
    const getDoc = await withdrawalRef.get();
    const withdrawal = getDoc.data(); //check if settled already

    if (withdrawal.status === 'settled') return (0, _response.errorResponse)(res, 400, 'error', 'Not allowed, withdrawal already settled'); //update investment as settled

    await withdrawalRef.update({
      status: 'settled',
      updatedAt: new Date().toISOString()
    });
    return (0, _response.default)(res, 201, 'success', {
      message: _messages.default.settledWithdrawalSuccess
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

var _default = {
  getWithdrawals,
  getWithdrawal,
  adminGetWithdrawal,
  startWithdrawal,
  getAllWithdrawals,
  approveWithdrawal,
  settleWithdrawal
};
exports.default = _default;