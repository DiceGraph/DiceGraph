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
import { Tooltip, registerLayout, registerNode, registerEdge } from "@antv/g6/es";
import DiceGraph from "../base/DiceGraph";
import { mixConfig } from "../util/config";
import { textCut } from "../util/text";
export var familyTreeGraphOption = {
    fitView: true,
    layout: {
        type: "dice-family-tree",
    },
    modes: {
        default: ["drag-canvas", "zoom-canvas"],
    },
    defaultNode: {
        size: [120, 60],
        type: "dice-familytree-node",
        anchorPoints: [
            [0.5, 0],
            [0.5, 1],
        ],
    },
    defaultEdge: {
        type: "dice-familytree-edge",
        style: {
            lineWidth: 2,
        },
    },
    plugins: [
        new Tooltip({
            getContent: function (e) {
                var cfg = e.item.get("model");
                return "\n      <div>\n        <h4>" + cfg.name + "</h4>\n        <p>" + (cfg.desc || "") + "</p>\n      </div>\n      ";
            },
        }),
    ],
};
var FamilyTreeGraph = /** @class */ (function (_super) {
    __extends(FamilyTreeGraph, _super);
    function FamilyTreeGraph(userConfig) {
        return _super.call(this, mixConfig(familyTreeGraphOption, userConfig)) || this;
    }
    FamilyTreeGraph.prototype.dataTransform = function (data) {
        var nodes = [];
        var edges = [];
        var readFamilyTree = function (man, level, startAtOffset) {
            var _a;
            if (level === void 0) { level = 0; }
            if (startAtOffset === void 0) { startAtOffset = {
                node: 0,
                gap: 0,
            }; }
            var currentLevel = {
                node: 1,
                gap: 1,
            };
            if ((_a = man.children) === null || _a === void 0 ? void 0 : _a.length) {
                man.children.forEach(function (child) {
                    edges.push({
                        relation: "child",
                        source: man.name + "-" + level,
                        target: child.name + "-" + (level + 1),
                    });
                    var res = readFamilyTree(child, level + 1, {
                        node: startAtOffset.node + currentLevel.node - 0.5,
                        gap: startAtOffset.gap + currentLevel.gap - 1,
                    });
                    currentLevel.node += res.node;
                    currentLevel.gap += res.gap;
                });
                currentLevel.gap -= 1;
            }
            var node = __assign(__assign({}, man), { label: man.name, id: man.name + "-" + level, hasMate: man.mate, layoutInfo: __assign(__assign({}, currentLevel), { level: level, startAtOffset: startAtOffset }) });
            if (man.mate) {
                nodes.push(__assign(__assign({}, man.mate), { label: man.mate.name, id: man.mate.name + "-" + level, mate: true, layoutInfo: __assign(__assign({}, currentLevel), { level: level, startAtOffset: startAtOffset }) }));
            }
            nodes.push(node);
            return currentLevel;
        };
        readFamilyTree(data);
        return {
            nodes: nodes,
            edges: edges,
        };
    };
    FamilyTreeGraph.prototype.registerCustomSetting = function () {
        registerLayout("dice-family-tree", {
            execute: function () {
                this.layout(this);
            },
            layout: function (data) {
                var config = this.getDefaultCfg() || {};
                var _a = config.gapWidth, gapWidth = _a === void 0 ? 20 : _a, _b = config.gapHeight, gapHeight = _b === void 0 ? 100 : _b;
                var nodes = data.nodes;
                var nodeWidth = 160 * 2;
                var nodeHeight = 60;
                nodes = nodes.map(function (n) {
                    var _a = n.layoutInfo, node = _a.node, level = _a.level, gap = _a.gap, _b = _a.startAtOffset, startNode = _b.node, startGap = _b.gap;
                    var totalWidth = node * nodeWidth + gap * gapWidth;
                    var startX = (startNode + 1) * nodeWidth + startGap * gapWidth + 100;
                    var startY = level * (nodeHeight + gapHeight) + 100;
                    if (n.hasMate) {
                        n.x = startX + totalWidth / 2;
                    }
                    else if (n.mate) {
                        n.x = startX + totalWidth / 2 - nodeWidth / 2;
                    }
                    else {
                        n.x = startX + totalWidth / 2 - nodeWidth / 4;
                    }
                    n.y = startY;
                    n.label = n.name;
                    return n;
                });
                return data;
            },
        });
        registerNode("dice-familytree-node", {
            jsx: function (cfg) { return "\n        <group>\n          <rect draggable=\"true\" style={{ height: 60, width: 160, radius: 6, fill: #fff, shadowBlur: 5, shadowColor: #ddd, shadowOffsetX: 4, shadowOffsetY: 4 }}>\n          <text style={{ marginLeft: 34, marginTop: " + (cfg.desc ? 8 : 22) + ", fontWeight: bold, fontSize: 14 }}>" + cfg.name + "</text>\n          <text style={{ marginLeft: 6, marginTop: 18 }}>" + textCut((cfg.desc || ""), 26) + "</text>\n          </rect>\n          <rect style={{ width: 24, height: 24, marginLeft: 6, marginTop: " + (cfg.desc ? -56 : -42) + ", stroke: " + (cfg.gender === "female"
                ? "#FF99C3"
                : cfg.gender === "male"
                    ? "#5B8FF9"
                    : "#999") + ", lineWidth: 3 }} />\n          " + (cfg.img
                ? "<image style={{ marginLeft: 6, width: 24, height: 24, img: " + cfg.img + ", radius: 12 }} />"
                : "") + "\n        </group>\n      "; },
            getAnchorPoints: function (cfg) {
                if (cfg.mate) {
                    return [
                        [0, 0],
                        [0, 1],
                    ];
                }
                if (cfg.hasMate) {
                    return [
                        [1, 0],
                        [1, 1],
                    ];
                }
                return [
                    [0.5, 1],
                    [0.5, 0],
                ];
            },
        });
        registerEdge("dice-familytree-edge", {
            getControlPoints: function (cfg) {
                var startPoint = cfg.startPoint, endPoint = cfg.endPoint;
                return [
                    {
                        x: startPoint.x,
                        y: (startPoint.y + endPoint.y) / 2,
                    },
                    {
                        x: endPoint.x,
                        y: (startPoint.y + endPoint.y) / 2,
                    },
                ];
            },
        }, "polyline");
    };
    return FamilyTreeGraph;
}(DiceGraph));
export default FamilyTreeGraph;
//# sourceMappingURL=FamilyTreeGraph.js.map