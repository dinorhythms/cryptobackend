"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var admin = _interopRequireWildcard(require("firebase-admin"));

var _cryptofoxFirebaseAdminsdk3qiy0797a = _interopRequireDefault(require("../service-account/cryptofox-firebase-adminsdk-3qiy0-797a355281.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

admin.initializeApp({
  credential: admin.credential.cert(_cryptofoxFirebaseAdminsdk3qiy0797a.default),
  databaseURL: process.env.DATABASE_URL
});
const db = admin.firestore();
const auth = admin.auth();
var _default = {
  db,
  auth
};
exports.default = _default;