"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = void 0;

var _firebaseFunctions = require("firebase-functions");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.get('/hello-world', function (req, res) {
  res.send('Hello from firebase ES6 function');
});

var api = _firebaseFunctions.https.onRequest(app);

exports.api = api;