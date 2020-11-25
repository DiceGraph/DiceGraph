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
import { Util, registerNode, registerEdge } from "@antv/g6/es";
import DiceGraph from "../base/DiceGraph";
import { mixConfig } from "../util/config";
export var decisionGraphOptions = {
    fitView: true,
    fitViewPadding: [10, 20],
    layout: {
        type: "dagre",
        controlPoints: false,
        nodesep: 20
    },
    modes: {
        default: [
            'drag-canvas',
            'zoom-canvas',
            'drag-node'
        ],
    },
    defaultEdge: {
        style: {
            lineWidth: 2,
            stroke: '#7DAAFF'
        },
        labelCfg: {
            position: 'start',
            refX: 20,
            style: {
                textAlign: 'center',
                stroke: '#fff',
                lineWidth: 2
            }
        }
    }
};
var DecisionGraph = /** @class */ (function (_super) {
    __extends(DecisionGraph, _super);
    function DecisionGraph(userConfig) {
        return _super.call(this, mixConfig(decisionGraphOptions, userConfig)) || this;
    }
    DecisionGraph.prototype.dataTransform = function (data) {
        var edges = [];
        var nodes = data.map(function (d) {
            if (d.options) {
                Object.keys(d.options)
                    .sort()
                    .forEach(function (e, i) {
                    edges.push({
                        type: "dice-decision-edge",
                        source: d.id,
                        target: d.options[e],
                        label: e,
                        index: i,
                    });
                });
            }
            var width = Math.max(Util.getTextSize(d.label, 14)[0] + 20, Object.keys(d.options || {}).length * 40);
            return __assign(__assign({ width: width, size: [width, 40] }, d), { type: "dice-decision-node" });
        });
        return {
            nodes: nodes,
            edges: edges,
        };
    };
    DecisionGraph.prototype.registerCustomSetting = function () {
        var _this = this;
        registerNode("dice-decision-node", {
            jsx: function (cfg) {
                var _a = cfg.options, options = _a === void 0 ? {} : _a;
                var optLen = Object.keys(options).length;
                var gap = 40;
                var startX = Number(cfg.width) / 2 - (gap * (optLen - 1)) / 2;
                return "<group>\n          <rect draggable=\"true\" style={{ width: " + cfg.width + ", height: 40, fill: #ffffff, stroke: #5B8FF9, radius: 8, lineWidth: 3 }}>\n            <text style={{ fontSize: 14, marginLeft: " + Number(cfg.width) / 2 + ", marginTop: 10, textAlign: center }}>" + cfg.label + "</text>\n            " + (optLen
                    ? Object.keys(options).map(function (e, i) {
                        return "<circle style={{ marginLeft: " + (startX + i * gap) + ", marginTop: " + (i ? 0 : 23) + ", fill: #fff, stroke: #5B8FF9, lineWidth: 3, r: 4, next: inline }} />";
                    })
                    : "") + "\n          </rect>\n        </group>\n      ";
            },
            getAnchorPoints: function () {
                return [
                    [0.5, 0],
                    [0.5, 1],
                ];
            },
        }, "single-node");
        registerEdge('dice-decision-edge', {
            getPathPoints: function (cfg) {
                var _a = _this.graph.findById(cfg.source).get('model').options, options = _a === void 0 ? {} : _a;
                var optLen = Object.keys(options).length;
                var gap = 40;
                var startX = cfg.startPoint.x - (optLen - 1) * gap / 2 + gap * Number(cfg.index);
                return __assign(__assign({}, cfg), { startPoint: __assign(__assign({}, cfg.startPoint), { x: startX }) });
            },
        }, "polyline");
    };
    return DecisionGraph;
}(DiceGraph));
export default DecisionGraph;
//# sourceMappingURL=DecisionGraph.js.map