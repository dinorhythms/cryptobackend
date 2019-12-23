"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authRoutes = _interopRequireDefault(require("./authRoutes"));

var _walletRoutes = _interopRequireDefault(require("./walletRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = router => {
  router.route('/').get((req, res) => {
    res.send('welcome to crypto api root endpoint');
  });
  (0, _authRoutes.default)(router);
  (0, _walletRoutes.default)(router);
};

var _default = routes;
exports.default = _default;