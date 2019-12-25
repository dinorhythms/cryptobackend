"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authRoutes = _interopRequireDefault(require("./authRoutes"));

var _walletRoutes = _interopRequireDefault(require("./walletRoutes"));

var _investmentRoutes = _interopRequireDefault(require("./investmentRoutes"));

var _withdrawalRoutes = _interopRequireDefault(require("./withdrawalRoutes"));

var _settingRoutes = _interopRequireDefault(require("./settingRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = router => {
  router.route('/').get((req, res) => {
    res.send('welcome to crypto api root endpoint');
  });
  (0, _authRoutes.default)(router);
  (0, _walletRoutes.default)(router);
  (0, _investmentRoutes.default)(router);
  (0, _withdrawalRoutes.default)(router);
  (0, _settingRoutes.default)(router);
};

var _default = routes;
exports.default = _default;