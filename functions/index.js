"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = void 0;

var _firebaseFunctions = require("firebase-functions");

var _express = _interopRequireDefault(require("express"));

var _trimRequestBody = _interopRequireDefault(require("trim-request-body"));

var _cors = _interopRequireDefault(require("cors"));

require("./config/env");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)(); // Automatically allow cross-origin requests

app.use((0, _cors.default)({
  origin: true
}));

const router = _express.default.Router();

(0, _routes.default)(router);
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_trimRequestBody.default);
app.use('/v1', router);
app.get('/', (req, res) => {
  res.send('Welcome to CryptoCurrency Backend');
}); // Handle routes not found

app.use('*', (req, res) => response(res, 404, 'error', {
  message: 'Not found'
}));

const api = _firebaseFunctions.https.onRequest(app);

exports.api = api;