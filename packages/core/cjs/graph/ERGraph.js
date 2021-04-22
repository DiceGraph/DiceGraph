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
var DiceGraph_1 = require("../base/DiceGraph");
var config_1 = require("../util/config");
var ERGraph = /** @class */ (function (_super) {
    __extends(ERGraph, _super);
    function ERGraph(userConfig) {
        return _super.call(this, config_1.mixConfig({
            fitView: true,
            fitViewPadding: [20],
            defaultNode: {
                size: [300, 400],
                type: 'dice-er-box',
                color: '#5B8FF9',
                style: {
                    fill: '#9EC9FF',
                    lineWidth: 3,
                },
                labelCfg: {
                    style: {
                        fill: 'black',
                        fontSize: 20,
                    },
                },
            },
            defaultEdge: {
                type: 'dice-er-edge',
                style: {
                    stroke: '#e2e2e2',
                    lineWidth: 4,
                    endArrow: true,
                },
            },
            modes: {
                default: ['dice-er-scroll', 'drag-node', 'drag-canvas'],
            },
            layout: {
                type: 'dagre',
                rankdir: 'LR',
                align: 'UL',
                controlPoints: true,
                nodesepFunc: function () { return 0.2; },
                ranksepFunc: function () { return 0.5; },
            },
            animate: true,
        }, userConfig)) || this;
    }
    ERGraph.prototype.dataTransform = function (data) {
        var nodes = [];
        var edges = [];
        data.map(function (node) {
            var _a;
            nodes.push(__assign({}, node));
            (_a = node.attrs) === null || _a === void 0 ? void 0 : _a.forEach(function (attr) {
                var _a;
                (_a = attr.relation) === null || _a === void 0 ? void 0 : _a.forEach(function (relation) {
                    edges.push({
                        source: node.id,
                        target: relation.nodeId,
                        sourceKey: attr.key,
                        targetKey: relation.key,
                        label: relation.label,
                    });
                });
            });
        });
        return {
            nodes: nodes,
            edges: edges,
        };
    };
    ERGraph.prototype.registerCustomSetting = function () {
        var isInBBox = function (point, bbox) {
            var x = point.x, y = point.y;
            var minX = bbox.minX, minY = bbox.minY, maxX = bbox.maxX, maxY = bbox.maxY;
            return x < maxX && x > minX && y > minY && y < maxY;
        };
        var itemHeight = 30;
        g6_1.registerBehavior("dice-er-scroll", {
            getDefaultCfg: function () {
                return {
                    multiple: true,
                };
            },
            getEvents: function () {
                return {
                    itemHeight: 50,
                    wheel: "scorll",
                    click: "click",
                    "node:mousemove": "move",
                };
            },
            scorll: function (e) {
                e.preventDefault();
                var graph = this.graph;
                var nodes = graph.getNodes().filter(function (n) {
                    var bbox = n.getBBox();
                    return isInBBox(graph.getPointByClient(e.clientX, e.clientY), bbox);
                });
                nodes.forEach(function (node) {
                    var model = node.getModel();
                    if (model.attrs.length < 9) {
                        return;
                    }
                    var idx = model.startIndex || 0;
                    var startX = model.startX || 0.5;
                    var startIndex = idx + e.deltaY * 0.02;
                    startX -= e.deltaX;
                    if (startIndex < 0) {
                        startIndex = 0;
                    }
                    if (startX > 0) {
                        startX = 0;
                    }
                    if (startIndex > model.attrs.length - 1) {
                        startIndex = model.attrs.length - 1;
                    }
                    graph.update(node, {
                        startIndex: startIndex,
                        startX: startX,
                    });
                });
            },
            click: function (e) {
                var graph = this.graph;
                var y = e.y;
                var item = e.item;
                var shape = e.shape;
                if (!item) {
                    return;
                }
                var model = item.getModel();
                if (shape.get("name") === "collapse") {
                    graph.updateItem(item, {
                        collapsed: true,
                        size: [300, 50],
                    });
                    setTimeout(function () { return graph.layout(); }, 100);
                }
                else if (shape.get("name") === "expand") {
                    graph.updateItem(item, {
                        collapsed: false,
                        size: [300, 500],
                    });
                    setTimeout(function () { return graph.layout(); }, 100);
                }
            },
            move: function (e) {
                var _a;
                var name = (_a = e.shape) === null || _a === void 0 ? void 0 : _a.get("name");
                var item = e.item;
                if (name && name.startsWith("item")) {
                    this.graph.updateItem(item, {
                        selectedIndex: Number(name.split("-")[1]),
                    });
                }
                else {
                    this.graph.updateItem(item, {
                        selectedIndex: NaN,
                    });
                }
            },
        });
        g6_1.registerEdge("dice-er-edge", {
            draw: function (cfg, group) {
                var _a;
                var edge = group.cfg.item;
                var sourceNode = edge.getSource().getModel();
                var targetNode = edge.getTarget().getModel();
                var sourceIndex = (_a = sourceNode.attrs) === null || _a === void 0 ? void 0 : _a.findIndex(function (e) { return e.key === cfg.sourceKey; });
                var sourceStartIndex = sourceNode.startIndex || 0;
                var sourceY = 15;
                if (!sourceNode.collapsed && sourceIndex > sourceStartIndex - 1) {
                    sourceY = 30 + (sourceIndex - sourceStartIndex + 0.5) * 30;
                    sourceY = Math.min(sourceY, 300);
                }
                var targetIndex = targetNode.attrs.findIndex(function (e) { return e.key === cfg.targetKey; });
                var targetStartIndex = targetNode.startIndex || 0;
                var targetY = 15;
                if (!targetNode.collapsed && targetIndex > targetStartIndex - 1) {
                    targetY = (targetIndex - targetStartIndex + 0.5) * 30 + 30;
                    targetY = Math.min(targetY, 300);
                }
                var startPoint = __assign({}, cfg.startPoint);
                var endPoint = __assign({}, cfg.endPoint);
                startPoint.y = startPoint.y + sourceY;
                endPoint.y = endPoint.y + targetY;
                var shape;
                if (sourceNode.id !== targetNode.id) {
                    shape = group.addShape("path", {
                        attrs: {
                            stroke: "#5B8FF9",
                            path: [
                                ["M", startPoint.x, startPoint.y],
                                [
                                    "C",
                                    endPoint.x / 3 + (2 / 3) * startPoint.x,
                                    startPoint.y,
                                    endPoint.x / 3 + (2 / 3) * startPoint.x,
                                    endPoint.y,
                                    endPoint.x,
                                    endPoint.y,
                                ],
                            ],
                            endArrow: true,
                        },
                        name: "path-shape",
                    });
                }
                else if (!sourceNode.collapsed) {
                    var gap = Math.abs((startPoint.y - endPoint.y) / 3);
                    if (startPoint["index"] === 1) {
                        gap = -gap;
                    }
                    shape = group.addShape("path", {
                        attrs: {
                            stroke: "#5B8FF9",
                            path: [
                                ["M", startPoint.x, startPoint.y],
                                [
                                    "C",
                                    startPoint.x - gap,
                                    startPoint.y,
                                    startPoint.x - gap,
                                    endPoint.y,
                                    startPoint.x,
                                    endPoint.y,
                                ],
                            ],
                            endArrow: true,
                        },
                        name: "path-shape",
                    });
                }
                return shape;
            },
            afterDraw: function (cfg, group) {
                var labelCfg = cfg.labelCfg || {};
                var edge = group.cfg.item;
                var sourceNode = edge.getSource().getModel();
                var targetNode = edge.getTarget().getModel();
                if (sourceNode.collapsed && targetNode.collapsed) {
                    return;
                }
                var path = group.find(function (element) { return element.get("name") === "path-shape"; });
                var labelStyle = g6_1.Util.getLabelPosition(path, 0.5, 0, 0, true);
                var label = group.addShape("text", {
                    attrs: __assign(__assign({}, labelStyle), { text: cfg.label || '', fill: "#000", textAlign: "center", stroke: "#fff", lineWidth: 1 }),
                });
                label.rotateAtStart(labelStyle.rotate);
            },
        });
        g6_1.registerNode("dice-er-box", {
            draw: function (cfg, group) {
                var width = 250;
                var height = 316;
                var itemCount = 10;
                var boxStyle = {
                    stroke: "#096DD9",
                    radius: 4,
                };
                var _a = cfg, _b = _a.attrs, attrs = _b === void 0 ? [] : _b, _c = _a.startIndex, startIndex = _c === void 0 ? 0 : _c, selectedIndex = _a.selectedIndex, collapsed = _a.collapsed, icon = _a.icon;
                var list = attrs;
                var afterList = list.slice(Math.floor(startIndex), Math.floor(startIndex + itemCount - 1));
                var offsetY = (0.5 - (startIndex % 1)) * itemHeight + 30;
                group.addShape("rect", {
                    attrs: {
                        fill: boxStyle.stroke,
                        height: 30,
                        width: width,
                        radius: [boxStyle.radius, boxStyle.radius, 0, 0],
                    },
                    draggable: true,
                });
                var fontLeft = 12;
                if (icon && icon.show !== false) {
                    group.addShape("image", {
                        attrs: __assign({ x: 8, y: 8, height: 16, width: 16 }, icon),
                    });
                    fontLeft += 18;
                }
                group.addShape("text", {
                    attrs: {
                        y: 22,
                        x: fontLeft,
                        fill: "#fff",
                        text: cfg.label,
                        fontSize: 12,
                        fontWeight: 500,
                    },
                });
                group.addShape("rect", {
                    attrs: {
                        x: 0,
                        y: collapsed ? 30 : 300,
                        height: 15,
                        width: width,
                        fill: "#eee",
                        radius: [0, 0, boxStyle.radius, boxStyle.radius],
                        cursor: "pointer",
                    },
                    name: collapsed ? "expand" : "collapse",
                });
                group.addShape("text", {
                    attrs: {
                        x: width / 2 - 6,
                        y: (collapsed ? 30 : 300) + 12,
                        text: collapsed ? "+" : "-",
                        width: width,
                        fill: "#000",
                        radius: [0, 0, boxStyle.radius, boxStyle.radius],
                        cursor: "pointer",
                    },
                    name: collapsed ? "expand" : "collapse",
                });
                var keyshape = group.addShape("rect", {
                    attrs: __assign({ x: 0, y: 0, width: width, height: collapsed ? 45 : height }, boxStyle),
                    draggable: true,
                });
                if (collapsed) {
                    return keyshape;
                }
                var listContainer = group.addGroup({});
                listContainer.setClip({
                    type: "rect",
                    attrs: {
                        x: -8,
                        y: 30,
                        width: width + 16,
                        height: 300 - 30,
                    },
                });
                listContainer.addShape({
                    type: "rect",
                    attrs: {
                        x: 1,
                        y: 30,
                        width: width - 2,
                        height: 300 - 30,
                        fill: "#fff",
                    },
                    draggable: true,
                });
                if (list.length > itemCount) {
                    var barStyle = {
                        width: 4,
                        padding: 0,
                        boxStyle: {
                            stroke: "#00000022",
                        },
                        innerStyle: {
                            fill: "#00000022",
                        },
                    };
                    listContainer.addShape("rect", {
                        attrs: __assign({ y: 30, x: width - barStyle.padding - barStyle.width, width: barStyle.width, height: height - 30 }, barStyle.boxStyle),
                    });
                    var indexHeight = afterList.length > itemCount
                        ? (afterList.length / list.length) * height
                        : 10;
                    listContainer.addShape("rect", {
                        attrs: __assign({ y: 30 +
                                barStyle.padding +
                                (startIndex / list.length) * (height - 30), x: width - barStyle.padding - barStyle.width, width: barStyle.width, height: Math.min(height, indexHeight) }, barStyle.innerStyle),
                    });
                }
                afterList.forEach(function (e, i) {
                    var isSelected = Math.floor(startIndex) + i === Number(selectedIndex);
                    var _a = e.key, key = _a === void 0 ? "" : _a, type = e.type;
                    if (type) {
                        key += " - " + type;
                    }
                    var label = key.length > 26 ? key.slice(0, 24) + "..." : key;
                    listContainer.addShape("rect", {
                        attrs: {
                            x: 1,
                            y: i * itemHeight - itemHeight / 2 + offsetY,
                            width: width - 4,
                            height: itemHeight,
                            radius: 2,
                            lineWidth: 1,
                            cursor: "pointer",
                        },
                        name: "item-" + (Math.floor(startIndex) + i) + "-content",
                        draggable: true,
                    });
                    if (!cfg.hideDot) {
                        listContainer.addShape("circle", {
                            attrs: {
                                x: 0,
                                y: i * itemHeight + offsetY,
                                r: 3,
                                stroke: boxStyle.stroke,
                                fill: "white",
                                radius: 2,
                                lineWidth: 1,
                                cursor: "pointer",
                            },
                        });
                        listContainer.addShape("circle", {
                            attrs: {
                                x: width,
                                y: i * itemHeight + offsetY,
                                r: 3,
                                stroke: boxStyle.stroke,
                                fill: "white",
                                radius: 2,
                                lineWidth: 1,
                                cursor: "pointer",
                            },
                        });
                    }
                    listContainer.addShape("text", {
                        attrs: {
                            x: 12,
                            y: i * itemHeight + offsetY + 6,
                            text: label,
                            fontSize: 12,
                            fill: "#000",
                            fontFamily: "Avenir,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                            full: e,
                            fontWeight: isSelected ? 500 : 100,
                            cursor: "pointer",
                        },
                        name: "item-" + (Math.floor(startIndex) + i),
                    });
                });
                return keyshape;
            },
            getAnchorPoints: function () {
                return [
                    [0, 0],
                    [1, 0],
                ];
            },
        });
    };
    return ERGraph;
}(DiceGraph_1.default));
exports.default = ERGraph;
//# sourceMappingURL=ERGraph.js.map