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
Object.defineProperty(exports, "__esModule", { value: true });
var g6_1 = require("@antv/g6");
var DiceGraph_1 = require("../base/DiceGraph");
var color_1 = require("../util/color");
var config_1 = require("../util/config");
var SankeyGraph = /** @class */ (function (_super) {
    __extends(SankeyGraph, _super);
    function SankeyGraph(useConfig) {
        return _super.call(this, config_1.mixConfig({
            defaultNode: {
                type: 'dice-sankey-node'
            },
            defaultEdge: {
                type: 'dice-sankey-edge'
            },
            fitView: true,
            layout: {
                type: 'dagre',
                rankdir: 'LR',
                nodesep: 10,
                ranksep: 200,
                align: 'ul'
            }
        }, useConfig)) || this;
    }
    SankeyGraph.prototype.dataTransform = function (data) {
        var nodes = [];
        var edges = [];
        var nodeRecvMap = {};
        data.forEach(function (node, i) {
            var id = node.id, label = node.label, _a = node.color, color = _a === void 0 ? color_1.colorArr[(i % color_1.colorArr.length)] : _a, _b = node.to, to = _b === void 0 ? [] : _b;
            var index = 0;
            to.forEach(function (rel) {
                edges.push({
                    source: id,
                    target: rel.target,
                    value: rel.value,
                    color: color,
                    sourceIndex: index,
                    targetIndex: (nodeRecvMap[rel.target] || 0)
                });
                index += rel.value || 0;
                if (rel.value) {
                    nodeRecvMap[rel.target] = (nodeRecvMap[rel.target] || 0) + rel.value;
                }
            });
            nodes.push({ id: id, label: label, color: color, outSize: index });
        });
        nodes.forEach(function (node) {
            node.inSize = nodeRecvMap[node.id] || 0;
            node.size = [4, Math.max(4, node.inSize, node.outSize)];
        });
        return {
            nodes: nodes, edges: edges
        };
    };
    SankeyGraph.prototype.registerCustomSetting = function () {
        g6_1.registerNode('dice-sankey-node', {
            jsx: function (cfg) { return "\n        <group>\n          <rect style={{ width: " + cfg.size[0] + ", height: " + cfg.size[1] + ", fill: " + cfg.color + " }} />\n          <text style={{ marginLeft: 6, marginTop: 24,  fill: #333, stroke: " + cfg.color + ", lineWidth: 2, fontSize: 24 }}>" + cfg.label + " " + cfg.size[1] + "</text>\n        </group>\n      "; },
            getAnchorPoints: function () {
                return [[0, 0]];
            }
        }, 'single-node');
        g6_1.registerEdge('dice-sankey-edge', {
            draw: function (cfg, group) {
                var startPoint = cfg.startPoint, endPoint = cfg.endPoint, color = cfg.color;
                var deltaY1 = Number(cfg.sourceIndex);
                var deltaY2 = Number(cfg.sourceIndex) + Number(cfg.value);
                var deltaY3 = Number(cfg.targetIndex);
                var deltaY4 = Number(cfg.targetIndex) + Number(cfg.value);
                var quaterX = Math.abs(endPoint.x - startPoint.x) / 5 * 3;
                return group.addShape('path', {
                    attrs: {
                        fill: color,
                        opacity: 0.6,
                        path: [
                            ['M', startPoint.x, startPoint.y + deltaY1],
                            ['C', endPoint.x - quaterX, startPoint.y + deltaY1, startPoint.x + quaterX, endPoint.y + deltaY3, endPoint.x, endPoint.y + deltaY3],
                            ['L', endPoint.x, endPoint.y + deltaY4],
                            ['C', startPoint.x + quaterX, endPoint.y + deltaY4, endPoint.x - quaterX, startPoint.y + deltaY2, startPoint.x, startPoint.y + deltaY2],
                            ['L', startPoint.x, startPoint.y + deltaY1],
                            ['Z']
                        ]
                    }
                });
            }
        });
    };
    return SankeyGraph;
}(DiceGraph_1.default));
exports.default = SankeyGraph;
//# sourceMappingURL=SankeyGraph.js.map