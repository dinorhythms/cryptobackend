"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _response = require("../utils/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = schema => (req, res, next) => {
  if (!schema) return next();
  const {
    body,
    params,
    query,
    file
  } = req;

  _joi.default.validate({ ...body,
    ...params,
    ...query,
    ...file
  }, schema, {
    abortEarly: false,
    stripUnknown: true,
    allowUnknown: true
  }).then(() => next()).catch(err => {
    const errors = {};
    err.details.forEach(e => {
      errors[e.message.split(' ', 1)[0].replace(/['"]/g, '')] = e.message.replace(/['"]/g, '');
    });
    return (0, _response.errorResponse)(res, 400, 'error', errors);
  });
};

exports.default = _default;