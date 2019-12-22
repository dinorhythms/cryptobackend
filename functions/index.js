"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = void 0;

var _firebaseFunctions = require("firebase-functions");

var _express = _interopRequireDefault(require("express"));

require("./config/env");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

const router = _express.default.Router();

(0, _routes.default)(router);
app.use(_express.default.json());
app.use('/v1', router);
app.get('/', (req, res) => {
  res.send('Welcome to CryptoCurrency Backend');
});

const api = _firebaseFunctions.https.onRequest(app);

exports.api = api;