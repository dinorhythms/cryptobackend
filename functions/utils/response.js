"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.errorResponse = void 0;

/**
 *  Send response message
 *
 * @param {object} res - response object
 * @param {number} status - http status code
 * @param {string} statusMessage - http status message
 * @param {object} data - response data
 *
 * @returns {object} returns response
 *
 * @example
 *
 *    response(res, 404, 'error', { message: 'not found'})
*/
const response = (res, status, statusMessage, data) => res.status(status).json({
  status: statusMessage,
  data
});

const errorResponse = (res, status, statusMessage, error) => res.status(status).json({
  status: statusMessage,
  error
});

exports.errorResponse = errorResponse;
var _default = response;
exports.default = _default;