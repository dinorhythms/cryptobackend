"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processInvestment = void 0;

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

const processInvestment = async (req, res, next) => {
  const {
    amount,
    planId
  } = req.body;

  try {
    const planDoc = await db.collection('plans').doc(planId).get();
    const plan = planDoc.data();
    if (!plan) return (0, _response.errorResponse)(res, 400, 'error', badPlanId);
    if (amount < plan.minimum || amount > plan.maximum) return (0, _response.errorResponse)(res, 400, 'error', amountOutOfRange); // get account to pay to

    const accountDoc = await db.collection('accounts').get();
    const account = [];
    accountDoc.forEach(doc => account.push(doc.data())); //process investment

    const startDate = new Date();
    const endDate = new Date();
    req.investment = {
      userId: req.user.uid,
      planId,
      amount,
      profit: (+amount * +plan.percentage / 100 - +amount).toFixed(2),
      total: (+amount * +plan.percentage / 100).toFixed(2),
      startTime: startDate.toISOString(),
      endTime: new Date(endDate.setDate(startDate.getDate() + +plan.investmentTime)).toISOString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      payToAccount: account[Math.floor(Math.random() * Math.floor(2))]
    };
    return next();
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

exports.processInvestment = processInvestment;