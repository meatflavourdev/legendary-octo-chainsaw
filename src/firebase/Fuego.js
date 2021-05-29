'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Fuego = void 0;
// fuego.ts
var app_1 = require('firebase/app');
var Fuego = /** @class */ (function () {
  function Fuego(config) {
    this.db = !app_1.default.apps.length
      ? app_1.default.initializeApp(config).firestore()
      : app_1.default.app().firestore();
    this.auth = app_1.default.auth;
    this.functions = app_1.default.functions;
    this.storage = app_1.default.storage;
  }
  return Fuego;
})();
exports.Fuego = Fuego;
