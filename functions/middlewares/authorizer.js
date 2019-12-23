"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _response = require("../utils/response");

var _messages = _interopRequireDefault(require("../utils/messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  forbidden
} = _messages.default;
/**
 * @function authorize
 * @param {Array} permitedRoles the roles allowed to use the route
 * @returns {Object} decoded object
 * @description checks if the user is allowed to access the route
 */

const authorize = permitedRoles => (req, res, next) => {
  const user = req.user;

  if (user[permitedRoles] === true) {
    return next();
  }

  return (0, _response.errorResponse)(res, 403, 'error', forbidden);
};

var _default = authorize;
exports.default = _default;