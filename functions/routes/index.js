"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authRoutes = _interopRequireDefault(require("./authRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = function routes(router) {
  router.route('/').get(function (req, res) {
    res.send('welcome to crypto api root endpoint');
  });
  (0, _authRoutes["default"])(router);
};

var _default = routes;
exports["default"] = _default;