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
import G6 from "@antv/g6/es";
import { generateStyleFromColor } from "../util/color";
var DiceGraph = /** @class */ (function () {
    function DiceGraph(config, colors) {
        var _this = this;
        if (config === void 0) { config = {}; }
        if (colors === void 0) { colors = {}; }
        var _a;
        // g6 graph to use
        this.graph = null;
        this.G6Core = G6;
        this.tree = false;
        this.colors = {
            color: "#096dd9",
            bgColor: "#fff",
        };
        this.getGraph = function () {
            return _this.graph;
        };
        this.createGraph = function (el) {
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
                return new G6.Graph(mixConfig);
            }
            else {
                console.warn(el, "mount element was not found");
                return null;
            }
        };
        this.setData = function (data) {
            _this.checkData(data);
            _this.data = _this.dataTransform(data);
            if (_this.graph) {
                _this.graph.changeData(_this.data);
            }
            return _this;
        };
        this.getData = function () {
            if (_this.graph) {
                return _this.graph.get("data");
            }
        };
        this.checkData = function (data) {
            return true;
        };
        if (config) {
            var color = __assign(__assign({}, colors), this.colors);
            var _b = generateStyleFromColor(color.color || "#096dd9", color.bgColor || "#fff"), stateStyles = _b.stateStyles, style = _b.style;
            this.config = __assign(__assign(__assign({}, this.config), config), { nodeStateStyles: stateStyles, defaultNode: __assign(__assign({}, (config.defaultNode || {})), { style: __assign(__assign({}, (((_a = config.defaultNode) === null || _a === void 0 ? void 0 : _a.style) || {})), style) }) });
        }
        this.registerCustomSetting();
    }
    DiceGraph.prototype.mount = function (el) {
        this.graph = this.createGraph(el);
        if (!this.graph) {
            return;
        }
        if (this.beforeRender) {
            this.beforeRender();
        }
        this.graph.data(this.data);
        this.graph.render();
        if (this.afterRender) {
            this.afterRender();
        }
    };
    DiceGraph.prototype.registerCustomSetting = function () { };
    DiceGraph.prototype.dataTransform = function (data) {
        return data;
    };
    DiceGraph.prototype.beforeRender = function () { };
    DiceGraph.prototype.afterRender = function () { };
    DiceGraph.prototype.render = function () {
        if (this.graph) {
            this.graph.render();
        }
    };
    return DiceGraph;
}());
export default DiceGraph;
//# sourceMappingURL=DiceGraph.js.map