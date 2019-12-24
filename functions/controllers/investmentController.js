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

const getInvestments = async (req, res) => {
  try {
    let user = req.user;
    const investmentDoc = await db.collection('investments').where('userId', '==', user.uid).get();
    const investments = [];
    investmentDoc.forEach(doc => investments.push({
      id: doc.id,
      ...doc.data()
    }));
    return (0, _response.default)(res, 200, 'success', {
      investments
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const getInvestment = async (req, res) => {
  try {
    const user = req.user;
    const {
      investmentId
    } = req.params;
    const investmentDoc = await db.collection('investments').doc(investmentId).get();
    const investment = investmentDoc.data();
    if (investment.userId != user.uid) return (0, _response.errorResponse)(res, 500, 'error', _messages.default.unauthorized);
    return (0, _response.default)(res, 200, 'success', {
      investment
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const adminGetInvestment = async (req, res) => {
  try {
    const {
      investmentId
    } = req.params;
    const investmentDoc = await db.collection('investments').doc(investmentId).get();
    const investment = investmentDoc.data();
    return (0, _response.default)(res, 200, 'success', {
      investment
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const getAllInvestments = async (req, res) => {
  try {
    let user = req.user;
    const investmentDoc = await db.collection('investments').get();
    const investments = [];
    investmentDoc.forEach(doc => investments.push({
      id: doc.id,
      ...doc.data()
    }));
    return (0, _response.default)(res, 200, 'success', {
      investments
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const startInvestment = async (req, res) => {
  try {
    const investment = req.investment;
    const investmentDoc = await db.collection('investments').add(investment);
    return (0, _response.default)(res, 201, 'success', {
      message: _messages.default.investmentSuccess
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const approveInvestment = async (req, res) => {
  try {
    const {
      investmentId
    } = req.params;
    const startDate = new Date();
    const endDate = new Date();
    const investmentRef = await db.collection('investments').doc(investmentId);
    const getDoc = await investmentRef.get();
    const investment = getDoc.data(); //check if approved already

    if (investment.status === 'running') return (0, _response.errorResponse)(res, 400, 'error', 'Not allowed, Investment already running'); // get plan

    const planDoc = await db.collection('plans').doc(investment.planId).get();
    const plan = planDoc.data();
    await investmentRef.update({
      status: 'running',
      startTime: startDate.toISOString(),
      endTime: new Date(endDate.setDate(startDate.getDate() + +plan.investmentTime)).toISOString(),
      updatedAt: new Date().toISOString()
    });
    return (0, _response.default)(res, 201, 'success', {
      message: _messages.default.approvalSuccess
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const settleInvestment = async (req, res) => {
  try {
    const {
      investmentId
    } = req.params;
    const investmentRef = await db.collection('investments').doc(investmentId);
    const getDoc = await investmentRef.get();
    const investment = getDoc.data(); // check if its time to settle

    if (investment.endTime < new Date().toISOString()) return (0, _response.errorResponse)(res, 400, 'error', _messages.default.notAllowed); //check if settled already

    if (investment.status === 'settled') return (0, _response.errorResponse)(res, 400, 'error', 'Not allowed, Investment already settled'); //update wallet

    const userId = investment.userId;
    const walletRef = await db.collection('wallets').doc(userId);
    const walletDoc = await walletRef.get();
    const wallet = walletDoc.data();
    await walletRef.update({
      balance: wallet.balance + +investment.total,
      totalProfit: wallet.totalProfit + +investment.profit,
      updatedAt: new Date().toISOString()
    }); //update investment as settled

    await investmentRef.update({
      status: 'settled',
      updatedAt: new Date().toISOString()
    });
    return (0, _response.default)(res, 201, 'success', {
      message: _messages.default.settledSuccess
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

var _default = {
  getInvestments,
  getInvestment,
  adminGetInvestment,
  startInvestment,
  getAllInvestments,
  approveInvestment,
  settleInvestment
};
exports.default = _default;