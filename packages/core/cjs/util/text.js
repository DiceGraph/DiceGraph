"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textCut = void 0;
var textCut = function (str, maxLen) {
    return str.length > maxLen - 3 ? str.slice(0, maxLen - 3) + '...' : str;
};
exports.textCut = textCut;
//# sourceMappingURL=text.js.map