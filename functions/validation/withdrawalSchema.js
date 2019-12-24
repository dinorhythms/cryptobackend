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
  amount: _JoiValidator.default.validateNumber().required(),
  bankName: _JoiValidator.default.validateString().required(),
  accountName: _JoiValidator.default.validateString().required(),
  accountNo: _JoiValidator.default.validateString().required()
});

exports.requestWithdrawalSchema = requestWithdrawalSchema;