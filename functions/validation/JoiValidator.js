"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** *
 *  Object that help to validate request details
 */
const JoiValidation = {
  validateString() {
    return _joi.default.string();
  },

  validateEmail() {
    return _joi.default.string().email();
  },

  validatePassword() {
    return _joi.default.string().min(8).strict().required();
  },

  /**
   * number schema creator
   * @returns {Object} - number schema
  */
  validateNumber() {
    return _joi.default.number();
  }

};
var _default = JoiValidation;
exports.default = _default;