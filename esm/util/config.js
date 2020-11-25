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
var mixObject = function (a, b) {
    return __assign(__assign({}, (a || {})), (b || {}));
};
export var mixConfig = function (graphConfig, userConfig) {
    return __assign(__assign({}, mixObject(graphConfig, userConfig)), { defaultNode: mixObject(graphConfig.defaultNode, userConfig.defaultNode), defaultEdge: mixObject(graphConfig.defaultEdge, userConfig.defaultEdge), defaultCombo: mixObject(graphConfig.defaultCombo, userConfig.defaultCombo), layout: mixObject(graphConfig.layout, userConfig.layout), nodeStateStyles: mixObject(graphConfig.nodeStateStyles, userConfig.nodeStateStyles), edgeStateStyles: mixObject(graphConfig.edgeStateStyles, userConfig.edgeStateStyles), comboStateStyles: mixObject(graphConfig.comboStateStyles, userConfig.comboStateStyles), modes: mixObject(graphConfig.modes, userConfig.modes) });
};
//# sourceMappingURL=config.js.map