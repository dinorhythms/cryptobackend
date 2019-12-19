"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _firebaseServices = _interopRequireDefault(require("../config/firebaseServices"));

var db = _firebaseServices["default"].db;

var getUsers = function _callee(req, res) {
  var users, snapshot;
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          users = [];
          _context.next = 4;
          return _regenerator["default"].awrap(db.collection('users').get());

        case 4:
          snapshot = _context.sent;
          snapshot.forEach(function (doc) {
            return users.push(doc.data());
          });
          res.status(200).json({
            users: users
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var _default = {
  getUsers: getUsers
};
exports["default"] = _default;