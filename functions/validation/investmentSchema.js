"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startInvestmentSchema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _JoiValidator = _interopRequireDefault(require("./JoiValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const startInvestmentSchema = _joi.default.object({
  planId: _JoiValidator.default.validateString().required(),
  amount: _JoiValidator.default.validateNumber().required()
});

exports.startInvestmentSchema = startInvestmentSchema;