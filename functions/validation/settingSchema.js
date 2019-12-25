"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settingsSchema = exports.updateAccountSchema = exports.accountIdSchema = exports.createAccountSchema = exports.updatePlanSchema = exports.planIdSchema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _JoiValidator = _interopRequireDefault(require("./JoiValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const planIdSchema = _joi.default.object({
  planId: _JoiValidator.default.validateString().required()
});

exports.planIdSchema = planIdSchema;

const accountIdSchema = _joi.default.object({
  accountId: _JoiValidator.default.validateString().required()
});

exports.accountIdSchema = accountIdSchema;

const updatePlanSchema = _joi.default.object({
  planId: _JoiValidator.default.validateString().required(),
  name: _JoiValidator.default.validateString().required(),
  description: _JoiValidator.default.validateString().required(),
  investmentTime: _JoiValidator.default.validateString().required(),
  minimum: _JoiValidator.default.validateString().required(),
  maximum: _JoiValidator.default.validateString().required(),
  percentage: _JoiValidator.default.validateString().required()
});

exports.updatePlanSchema = updatePlanSchema;

const createAccountSchema = _joi.default.object({
  name: _JoiValidator.default.validateString().required(),
  accountNo: _JoiValidator.default.validateString().required()
});

exports.createAccountSchema = createAccountSchema;

const updateAccountSchema = _joi.default.object({
  accountId: _JoiValidator.default.validateString().required(),
  name: _JoiValidator.default.validateString().required(),
  accountNo: _JoiValidator.default.validateString().required()
});

exports.updateAccountSchema = updateAccountSchema;

const settingsSchema = _joi.default.object({
  currency: _JoiValidator.default.validateString().required(),
  currencySign: _JoiValidator.default.validateString().required()
});

exports.settingsSchema = settingsSchema;