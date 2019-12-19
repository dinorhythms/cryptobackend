"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = void 0;

var _firebaseFunctions = require("firebase-functions");

var _express = _interopRequireDefault(require("express"));

require("./config/env");

var _routes = _interopRequireDefault(require("./routes"));

var app = (0, _express["default"])();

var router = _express["default"].Router();

(0, _routes["default"])(router);
app.use(_express["default"].json());
app.use('/v1', router);
app.get('/', function (req, res) {
  res.send('Welcome to CryptoCurrency Backend');
});

var api = _firebaseFunctions.https.onRequest(app);

exports.api = api;