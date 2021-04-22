"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var g6_1 = require("@antv/g6");
var DiceGraph_1 = require("./DiceGraph");
var TreeGraph = /** @class */ (function (_super) {
    __extends(TreeGraph, _super);
    function TreeGraph() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.createGraph = function (el) {
            var target;
            if (typeof el === "string") {
                target = document.getElementById(el);
            }
            else {
                target = el;
            }
            if (target) {
                _this.el = target;
                var width = target.clientWidth;
                var height = target.clientHeight;
                var mixConfig = __assign({ container: el, width: width,
                    height: height }, _this.config);
                return new g6_1.TreeGraph(mixConfig);
            }
            else {
                console.warn(el, "mount element was not found");
                return null;
            }
        };
        return _this;
    }
    return TreeGraph;
}(DiceGraph_1.default));
exports.default = TreeGraph;
//# sourceMappingURL=TreeGraph.js.map