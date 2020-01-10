"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePublicSchema = exports.approveInvestmentSchema = exports.startInvestmentSchema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _JoiValidator = _interopRequireDefault(require("./JoiValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const startInvestmentSchema = _joi.default.object({
  planId: _JoiValidator.default.validateString().required(),
  amount: _JoiValidator.default.validateNumber().required()
});

exports.startInvestmentSchema = startInvestmentSchema;

const approveInvestmentSchema = _joi.default.object({
  investmentId: _JoiValidator.default.validateString().required()
});

exports.approveInvestmentSchema = approveInvestmentSchema;

const updatePublicSchema = _joi.default.object({
  investmentId: _JoiValidator.default.validateString().required(),
  name: _JoiValidator.default.validateString().required(),
  date: _JoiValidator.default.validateString().required(),
  investmentAmount: _JoiValidator.default.validateString().required(),
  payoutTime: _JoiValidator.default.validateString().required(),
  payoutAmount: _JoiValidator.default.validateString().required()
});

exports.updatePublicSchema = updatePublicSchema;