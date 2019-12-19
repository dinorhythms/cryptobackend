"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var auth = function auth(router) {
  router.route('/auth/users').get(function (req, res) {
    res.send('get all users');
  });
};

var _default = auth;
exports["default"] = _default;