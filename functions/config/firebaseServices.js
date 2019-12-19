"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var admin = _interopRequireWildcard(require("firebase-admin"));

var _cryptofoxFirebaseAdminsdk3qiy0797a = _interopRequireDefault(require("../../service-account/cryptofox-firebase-adminsdk-3qiy0-797a355281.json"));

admin.initializeApp({
  credential: admin.credential.cert(_cryptofoxFirebaseAdminsdk3qiy0797a["default"]),
  databaseURL: process.env.DATABASE_URL
});
var db = admin.firestore();
var _default = {
  db: db
};
exports["default"] = _default;