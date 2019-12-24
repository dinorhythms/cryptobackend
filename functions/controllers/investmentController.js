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
    investmentDoc.forEach(doc => investments.push(doc.data()));
    return (0, _response.default)(res, 200, 'success', {
      investments
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

const startInvestment = async (req, res) => {
  try {
    let investment = req.investment;
    const investmentDoc = await db.collection('investments').add(investment);
    return (0, _response.default)(res, 201, 'success', {
      message: _messages.default.investmentSuccess
    });
  } catch (error) {
    return (0, _response.errorResponse)(res, 500, 'error', error.message);
  }
};

var _default = {
  getInvestments,
  startInvestment
};
exports.default = _default;