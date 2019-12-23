"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signInSchema = exports.signUpSchema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _JoiValidator = _interopRequireDefault(require("./JoiValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const signUpSchema = _joi.default.object({
  email: _JoiValidator.default.validateEmail().required(),
  password: _JoiValidator.default.validatePassword().required(),
  firstname: _JoiValidator.default.validateString().required(),
  lastname: _JoiValidator.default.validateString().required(),
  phone: _JoiValidator.default.validateNumber().required(),
  address: _JoiValidator.default.validateString().required(),
  state: _JoiValidator.default.validateString().required(),
  country: _JoiValidator.default.validateString().required(),
  zipcode: _JoiValidator.default.validateString().required()
});

exports.signUpSchema = signUpSchema;

const signInSchema = _joi.default.object({
  email: _JoiValidator.default.validateEmail().required(),
  password: _JoiValidator.default.validatePassword().required()
});

exports.signInSchema = signInSchema;