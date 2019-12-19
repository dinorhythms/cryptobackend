"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authController = _interopRequireDefault(require("../controllers/authController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getUsers = _authController["default"].getUsers;

var auth = function auth(router) {
  router.route('/auth/users').get(getUsers);
};

var _default = auth;
exports["default"] = _default;