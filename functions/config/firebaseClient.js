"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.clientAuth = void 0;

var firebase = _interopRequireWildcard(require("firebase/app"));

require("firebase/auth");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const config = {
  apiKey: "AIzaSyBvu2XxIUjdFxI4j6Zr8y-WYjB3OLjO5vU",
  authDomain: "cryptofox.firebaseapp.com",
  databaseURL: "https://cryptofox.firebaseio.com",
  projectId: "cryptofox",
  storageBucket: "cryptofox.appspot.com",
  messagingSenderId: "647762671215",
  appID: "cryptofox"
};
firebase.initializeApp(config);
const clientAuth = firebase.auth();
exports.clientAuth = clientAuth;
var _default = {
  clientAuth
};
exports.default = _default;