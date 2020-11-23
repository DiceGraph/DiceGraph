var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
import TreeGraph from "../base/TreeGraph";
var MindMapGraph = /** @class */ (function (_super) {
    __extends(MindMapGraph, _super);
    function MindMapGraph(userConfig) {
        if (userConfig === void 0) { userConfig = {}; }
        var _this = _super.call(this, __assign({ fitView: true, fitViewPadding: [10, 20], layout: {
                type: 'mindmap',
                direction: 'H',
                getHeight: function () {
                    return 16;
                },
                getWidth: function (node) {
                    return node.level === 0 ? _this.G6Core.Util.getTextSize(node.label, 16)[0] + 12 : _this.G6Core.Util.getTextSize(node.label, 12)[0];
                },
                getVGap: function () {
                    return 10;
                },
                getHGap: function () {
                    return 60;
                },
            }, defaultEdge: {
                type: 'cubic-horizontal',
                style: {
                    lineWidth: 2,
                }
            }, modes: {
                default: [
                    {
                        type: 'collapse-expand',
                        onChange: function onChange(item, collapsed) {
                            var data = item.get('model').data;
                            data.collapsed = collapsed;
                            return true;
                        },
                    },
                    'drag-canvas',
                    'zoom-canvas',
                ],
            } }, userConfig)) || this;
        _this.tree = true;
        return _this;
    }
    MindMapGraph.prototype.dataTransform = function (data) {
        var changeData = function (d, level, color) {
            if (level === void 0) { level = 0; }
            var data = __assign({}, d);
            switch (level) {
                case 0:
                    data.type = 'dice-mind-map-root';
                    break;
                case 1:
                    data.type = 'dice-mind-map-sub';
                    break;
                default:
                    data.type = 'dice-mind-map-leaf';
                    break;
            }
            if (color) {
                data.color = color;
            }
            if (d.children) {
                data.children = d.children.map(function (child) { return changeData(child, level + 1, data.color); });
            }
            return data;
        };
        return changeData(data);
    };
    MindMapGraph.prototype.registerCustomSetting = function () {
        var G6Core = this.G6Core;
        G6Core.registerNode('dice-mind-map-root', {
            jsx: function (cfg) {
                var width = G6Core.Util.getTextSize(cfg.label, 16)[0] + 24;
                var stroke = cfg.style.stroke || '#096dd9';
                var fill = cfg.style.fill;
                return "\n          <group>\n            <rect style={{width: " + width + ", height: 42, stroke: " + stroke + ", fill: " + fill + ", radius: 4}} keyshape>\n              <text style={{ fontSize: 16, marginLeft: 12, marginTop: 12 }}>" + cfg.label + "</text>\n            </rect>\n          </group>\n        ";
            },
            getAnchorPoints: function () {
                return [[0, 0.5], [1, 0.5]];
            }
        }, 'single-node');
        G6Core.registerNode('dice-mind-map-sub', {
            jsx: function (cfg) {
                var width = G6Core.Util.getTextSize(cfg.label, 14)[0] + 24;
                var color = cfg.color || cfg.style.stroke;
                return "\n          <group>\n            <rect style={{width: " + width + ", height: 22}}>\n              <text style={{ fontSize: 14, marginLeft: 12, marginTop: 6 }}>" + cfg.label + "</text>\n            </rect>\n            <rect style={{ fill: " + color + ", width: " + width + ", height: 4, x: 0, y: 22 }} />\n          </group>\n        ";
            },
            getAnchorPoints: function () {
                return [[0, 1], [1, 1]];
            }
        }, 'single-node');
        G6Core.registerNode('dice-mind-map-leaf', {
            jsx: function (cfg) {
                var width = G6Core.Util.getTextSize(cfg.label, 12)[0] + 24;
                var color = cfg.color || cfg.style.stroke;
                return "\n          <group>\n            <rect style={{width: " + width + ", height: 22 }}>\n              <text style={{ fontSize: 12, marginLeft: 12, marginTop: 6 }}>" + cfg.label + "</text>\n            </rect>\n            <rect style={{ fill: " + color + ", width: " + width + ", height: 2, x: 0, y: 32 }} />\n          </group>\n        ";
            },
            getAnchorPoints: function () {
                return [[0, 1], [1, 1]];
            }
        }, 'single-node');
    };
    MindMapGraph.prototype.afterRender = function () {
        var _this = this;
        var changeEdge = function () { return _this.graph.getEdges().forEach(function (e) { return _this.graph.updateItem(e, { style: { stroke: e.getTarget().get('model').color, lineWidth: 2 } }); }); };
        changeEdge();
        this.graph.on('afterlayout', changeEdge);
    };
    return MindMapGraph;
}(TreeGraph));
export default MindMapGraph;
//# sourceMappingURL=MindMapGraph.js.map