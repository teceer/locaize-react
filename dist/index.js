"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocaizeClient = exports.SelectLanguage = exports.useLanguage = exports.LanguageProvider = void 0;
var LanguageContext_1 = require("./LanguageContext");
Object.defineProperty(exports, "LanguageProvider", { enumerable: true, get: function () { return LanguageContext_1.LanguageProvider; } });
Object.defineProperty(exports, "useLanguage", { enumerable: true, get: function () { return LanguageContext_1.useLanguage; } });
Object.defineProperty(exports, "SelectLanguage", { enumerable: true, get: function () { return LanguageContext_1.SelectLanguage; } });
var locaizeClient_1 = require("./locaizeClient");
Object.defineProperty(exports, "createLocaizeClient", { enumerable: true, get: function () { return locaizeClient_1.createLocaizeClient; } });
