"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixConfig = void 0;
var mixObject = function (a, b) {
    return __assign(__assign({}, (a || {})), (b || {}));
};
var mixConfig = function (graphConfig, userConfig) {
    return __assign(__assign({}, mixObject(graphConfig, userConfig)), { defaultNode: mixObject(graphConfig.defaultNode, userConfig.defaultNode), defaultEdge: mixObject(graphConfig.defaultEdge, userConfig.defaultEdge), defaultCombo: mixObject(graphConfig.defaultCombo, userConfig.defaultCombo), layout: mixObject(graphConfig.layout, userConfig.layout), nodeStateStyles: mixObject(graphConfig.nodeStateStyles, userConfig.nodeStateStyles), edgeStateStyles: mixObject(graphConfig.edgeStateStyles, userConfig.edgeStateStyles), comboStateStyles: mixObject(graphConfig.comboStateStyles, userConfig.comboStateStyles), modes: mixObject(graphConfig.modes, userConfig.modes) });
};
exports.mixConfig = mixConfig;
//# sourceMappingURL=config.js.map