"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkToken = void 0;

var _firebaseAdmin = _interopRequireDefault(require("../config/firebaseAdmin"));

var _firebaseClient = _interopRequireDefault(require("../config/firebaseClient"));

var _response = require("../utils/response");

var _messages = _interopRequireDefault(require("../utils/messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  invalidToken,
  noToken
} = _messages.default;
const {
  db,
  auth
} = _firebaseAdmin.default;
const {
  clientAuth
} = _firebaseClient.default;
/**
 * @method checkToken
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {Object} response object
 */

const checkToken = async (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split('Bearer ')[1];
      const decoded = await auth.verifyIdToken(token);
      req.user = decoded;
      return next();
    }

    return (0, _response.errorResponse)(res, 401, 'error', noToken);
  } catch (error) {
    if (error.code === 'auth/argument-error') {
      return (0, _response.errorResponse)(res, 401, 'error', invalidToken);
    }

    return (0, _response.errorResponse)(res, 500, 'error', error.code);
  }
};

exports.checkToken = checkToken;