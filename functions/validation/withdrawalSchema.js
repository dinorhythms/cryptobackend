"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestWithdrawalSchema = exports.withdrawalSchema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _JoiValidator = _interopRequireDefault(require("./JoiValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const withdrawalSchema = _joi.default.object({
  withdrawalId: _JoiValidator.default.validateString().required()
});

exports.withdrawalSchema = withdrawalSchema;

const requestWithdrawalSchema = _joi.default.object({
  btcAddress: _JoiValidator.default.validateString().required(),
  amount: _JoiValidator.default.validateNumber(),
  bankName: _JoiValidator.default.validateString(),
  accountName: _JoiValidator.default.validateString(),
  accountNo: _JoiValidator.default.validateString()
});

exports.requestWithdrawalSchema = requestWithdrawalSchema;