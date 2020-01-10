"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _firebaseAdmin = _interopRequireDefault(require("../config/firebaseAdmin"));

var _response = _interopRequireWildcard(require("../utils/response"));

var _messages = _interopRequireDefault(require("../utils/messages"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  db
} = _firebaseAdmin.default;

const getPlans = async (req, res) => {
  try {
    const planDoc = await db.collection('plans').get();
    const plans = [];
    planDoc.forEach(doc => plans.push({
      id: doc.id,
      ...doc.data()
    }));
    return (0, _response.default)(res, 200, 'success', {
      plans
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const getPlan = async (req, res) => {
  try {
    const {
      planId
    } = req.params;
    const planDoc = await db.collection('plans').doc(planId).get();
    if (!planDoc.exists) return (0, _response.errorResponse)(res, 500, 'error', _messages.default.unauthorized);
    const plan = planDoc.data();
    return (0, _response.default)(res, 200, 'success', {
      id: planDoc.id,
      ...plan
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const getCountries = async (_, res) => {
  try {
    const url = `http://battuta.medunes.net/api/country/all/?key=e079633f8eb8758e162f00a2ebab5f05`;
    const resp = await (0, _axios.default)(url);
    const countries = resp.data;
    return (0, _response.default)(res, 200, 'success', {
      countries
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const getStates = async (req, res) => {
  try {
    const {
      countryCode
    } = req.params;
    const url = `http://battuta.medunes.net/api/region/${countryCode}/all/?key=e079633f8eb8758e162f00a2ebab5f05`;
    const resp = await (0, _axios.default)(url);
    const states = resp.data;
    return (0, _response.default)(res, 200, 'success', {
      states
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const getCities = async (req, res) => {
  try {
    const {
      countryCode,
      region
    } = req.params;
    const url = `http://battuta.medunes.net/api/city/${countryCode}/search/?region=${region}&key=e079633f8eb8758e162f00a2ebab5f05`;
    const resp = await (0, _axios.default)(url);
    const cities = resp.data;
    return (0, _response.default)(res, 200, 'success', {
      cities
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const updatePlan = async (req, res) => {
  try {
    const {
      planId
    } = req.params;
    const {
      name,
      description,
      minimum,
      maximum,
      percentage,
      investmentTime
    } = req.body;
    const planRef = await db.collection('plans').doc(planId);
    await planRef.update({
      planId,
      name,
      description,
      minimum,
      maximum,
      percentage,
      investmentTime,
      updatedAt: new Date().toISOString()
    });
    return (0, _response.default)(res, 201, 'success', {
      message: _messages.default.planUpdated
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const createAccount = async (req, res) => {
  try {
    const {
      name,
      accountNo
    } = req.body;
    const accountRef = db.collection('accounts');
    const getDoc = await accountRef.where('accountNo', '==', accountNo).get(); //check if exists already

    if (!getDoc.empty) return (0, _response.errorResponse)(res, 400, 'error', 'Not allowed, account already exists');
    await accountRef.add({
      name,
      accountNo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return (0, _response.default)(res, 201, 'success', {
      message: _messages.default.accountCreated
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const getAccounts = async (req, res) => {
  try {
    const accountDoc = await db.collection('accounts').get();
    if (accountDoc.empty) return (0, _response.errorResponse)(res, 500, 'error', {
      message: 'No record found'
    });
    let account = [];
    accountDoc.forEach(doc => account.push({
      id: doc.id,
      ...doc.data()
    }));
    return (0, _response.default)(res, 200, 'success', {
      account
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const updateAccount = async (req, res) => {
  try {
    const {
      accountId
    } = req.params;
    const {
      name,
      accountNo
    } = req.body;
    const accountRef = db.collection('accounts').doc(accountId);
    await accountRef.update({
      name,
      accountNo,
      updatedAt: new Date().toISOString()
    });
    return (0, _response.default)(res, 201, 'success', {
      message: _messages.default.accountUpdated
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const updateSettings = async (req, res) => {
  try {
    const {
      currency,
      currencySign
    } = req.body;
    const settingRef = db.collection('settings').doc('settings');
    await settingRef.update({
      currency,
      currencySign,
      updatedAt: new Date().toISOString()
    });
    return (0, _response.default)(res, 201, 'success', {
      message: _messages.default.settingsUpdated
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
  getPlans,
  getPlan,
  adminGetWithdrawal,
  updateAccount,
  updateSettings,
  getCountries,
  getStates,
  getCities,
  updatePlan,
  createAccount,
  getAccounts,
  getAllWithdrawals,
  approveWithdrawal,
  settleWithdrawal
};
exports.default = _default;