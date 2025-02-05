"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectLanguage = exports.useLanguage = exports.LanguageProvider = void 0;
var react_1 = __importStar(require("react"));
var LanguageContext = (0, react_1.createContext)({});
var LanguageProvider = function (_a) {
    var language = _a.language, children = _a.children;
    var _b = (0, react_1.useState)(language), lang = _b[0], setLang = _b[1];
    var _c = (0, react_1.useState)(false), mounted = _c[0], setMounted = _c[1];
    (0, react_1.useEffect)(function () {
        setMounted(true);
    }, []);
    (0, react_1.useEffect)(function () {
        var userLanguage = navigator.language;
        setLang(userLanguage);
    }, [mounted]);
    return (react_1.default.createElement(LanguageContext.Provider, { value: { language: lang, setLanguage: setLang } }, children));
};
exports.LanguageProvider = LanguageProvider;
var useLanguage = function () {
    var language = (0, react_1.useContext)(LanguageContext).language;
    if (language === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return language;
};
exports.useLanguage = useLanguage;
var SelectLanguage = function () {
    var _a = (0, react_1.useContext)(LanguageContext), language = _a.language, setLanguage = _a.setLanguage;
    return (react_1.default.createElement("select", { value: language, onChange: function (e) {
            setLanguage(e.target.value);
        } },
        react_1.default.createElement("option", { value: "pl-PL" }, "Polski"),
        react_1.default.createElement("option", { value: "en-US" }, "English"),
        react_1.default.createElement("option", { value: "es-ES" }, "Espa\u00F1ol"),
        react_1.default.createElement("option", { value: "fr-FR" }, "Fran\u00E7ais"),
        react_1.default.createElement("option", { value: "de-DE" }, "Deutsch"),
        react_1.default.createElement("option", { value: "it-IT" }, "Italiano")));
};
exports.SelectLanguage = SelectLanguage;
