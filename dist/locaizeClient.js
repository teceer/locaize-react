"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocaizeClient = void 0;
var react_1 = require("react");
var LanguageContext_1 = require("./LanguageContext");
var LOCAIZE_API_URL = process.env.NEXT_PUBLIC_LOCAIZE_API_URL || "https://api.locaize.com";
var createLocaizeClient = function (options) {
    var apiKey = options.apiKey;
    var fetchTranslation = function fetchTranslation(template, language) {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("".concat(LOCAIZE_API_URL, "/translate"), {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: apiKey,
                                },
                                body: JSON.stringify({
                                    language: language,
                                    value: template,
                                }),
                            })];
                    case 1:
                        res = _a.sent();
                        if (!res.ok) {
                            throw new Error("Translation request failed");
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = (_a.sent());
                        return [2 /*return*/, data.translated];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Translation failed:", error_1);
                        return [2 /*return*/, template]; // Return original text as fallback
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    var clientSide = function (strings) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        var _a = (0, react_1.useState)(), translated = _a[0], setTranslated = _a[1];
        var language = (0, LanguageContext_1.useLanguage)(); // Get language from context
        (0, react_1.useEffect)(function () {
            var template = strings[0];
            for (var i = 0; i < values.length; i++) {
                template += "${value".concat(i + 1, "}") + strings[i + 1];
            }
            var loadTranslation = function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!template)
                                return [2 /*return*/];
                            return [4 /*yield*/, fetchTranslation(template, language)];
                        case 1:
                            result = _a.sent();
                            values.forEach(function (value, index) {
                                result = result.replace("${value".concat(index + 1, "}"), String(value));
                            });
                            setTranslated(result);
                            return [2 /*return*/];
                    }
                });
            }); };
            void loadTranslation();
        }, __spreadArray([strings, language], values, true));
        return translated;
    };
    var serverSide = function (strings, language) {
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        return __awaiter(void 0, void 0, void 0, function () {
            var template, i, translated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        template = strings[0];
                        for (i = 0; i < values.length; i++) {
                            template += "${value".concat(i + 1, "}") + strings[i + 1];
                        }
                        if (!template)
                            return [2 /*return*/, ""];
                        return [4 /*yield*/, fetchTranslation(template, language)];
                    case 1:
                        translated = _a.sent();
                        values.forEach(function (value, index) {
                            translated = translated.replace("${value".concat(index + 1, "}"), String(value));
                        });
                        return [2 /*return*/, translated];
                }
            });
        });
    };
    return {
        clientSide: function () { return clientSide; },
        serverSide: function () { return serverSide; },
    };
};
exports.createLocaizeClient = createLocaizeClient;
