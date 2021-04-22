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
import { Util, registerNode, registerBehavior } from "@antv/g6";
import TreeGraph from "../base/TreeGraph";
import { colorArr } from "../util/color";
import { mixConfig } from "../util/config";
export var mindMapGraphOption = {
    fitView: true,
    fitViewPadding: [10, 20],
    layout: {
        type: "mindmap",
        direction: "H",
        getHeight: function () {
            return 16;
        },
        getWidth: function (node) {
            return node.level === 0
                ? Util.getTextSize(node.label, 16)[0] + 12
                : Util.getTextSize(node.label, 12)[0];
        },
        getVGap: function () {
            return 10;
        },
        getHGap: function () {
            return 60;
        },
        getSide: function (node) {
            return node.data.direction;
        },
    },
    defaultEdge: {
        type: "cubic-horizontal",
        style: {
            lineWidth: 2,
        },
    },
    minZoom: 0.5,
    modes: {
        default: ["drag-canvas", "zoom-canvas", "dice-mindmap"],
    },
};
var MindMapGraph = /** @class */ (function (_super) {
    __extends(MindMapGraph, _super);
    function MindMapGraph(userConfig) {
        var _this = _super.call(this, mixConfig(mindMapGraphOption, userConfig)) || this;
        _this.tree = true;
        return _this;
    }
    MindMapGraph.prototype.dataTransform = function (data) {
        var changeData = function (d, level, color) {
            if (level === void 0) { level = 0; }
            var data = __assign({}, d);
            switch (level) {
                case 0:
                    data.type = "dice-mind-map-root";
                    break;
                case 1:
                    data.type = "dice-mind-map-sub";
                    break;
                default:
                    data.type = "dice-mind-map-leaf";
                    break;
            }
            data.hover = false;
            if (color) {
                data.color = color;
            }
            if (level === 1 && !d.direction) {
                if (!d.direction) {
                    data.direction =
                        d.id.charCodeAt(d.id.length - 1) % 2 === 0 ? "right" : "left";
                }
            }
            if (d.children) {
                data.children = d.children.map(function (child) {
                    return changeData(child, level + 1, data.color);
                });
            }
            return data;
        };
        return changeData(data);
    };
    MindMapGraph.prototype.registerCustomSetting = function () {
        registerNode("dice-mind-map-root", {
            jsx: function (cfg) {
                var width = Util.getTextSize(cfg.label, 16)[0] + 24;
                var stroke = cfg.style.stroke || "#096dd9";
                var fill = cfg.style.fill;
                return "\n          <group>\n            <rect draggable=\"true\" style={{width: " + width + ", height: 42, stroke: " + stroke + ", fill: " + fill + ", radius: 4}} keyshape>\n              <text style={{ fontSize: 16, marginLeft: 12, marginTop: 12 }}>" + cfg.label + "</text>\n              <text style={{ marginLeft: " + (width - 16) + ", marginTop: -20, stroke: '#66ccff', fill: '#000', cursor: 'pointer', opacity: " + (cfg.hover ? 0.75 : 0) + " }} action=\"add\">+</text>\n            </rect>\n          </group>\n        ";
            },
            getAnchorPoints: function () {
                return [
                    [0, 0.5],
                    [1, 0.5],
                ];
            },
        }, "single-node");
        registerNode("dice-mind-map-sub", {
            jsx: function (cfg) {
                var width = Util.getTextSize(cfg.label, 14)[0] + 24;
                var color = cfg.color || cfg.style.stroke;
                return "\n          <group>\n            <rect draggable=\"true\" style={{width: " + (width + 24) + ", height: 22}} keyshape>\n              <text draggable=\"true\" style={{ fontSize: 14, marginLeft: 12, marginTop: 6 }}>" + cfg.label + "</text>\n              <text style={{ marginLeft: " + (width - 8) + ", marginTop: -10, stroke: " + color + ", fill: '#000', cursor: 'pointer', opacity: " + (cfg.hover ? 0.75 : 0) + ", next: 'inline' }} action=\"add\">+</text>\n              <text style={{ marginLeft: " + (width - 4) + ", marginTop: -10, stroke: " + color + ", fill: '#000', cursor: 'pointer', opacity: " + (cfg.hover ? 0.75 : 0) + ", next: 'inline' }} action=\"delete\">-</text>\n            </rect>\n            <rect style={{ fill: " + color + ", width: " + (width + 24) + ", height: 2, x: 0, y: 22 }} />\n            \n          </group>\n        ";
            },
            getAnchorPoints: function () {
                return [
                    [0, 0.965],
                    [1, 0.965],
                ];
            },
        }, "single-node");
        registerNode("dice-mind-map-leaf", {
            jsx: function (cfg) {
                var width = Util.getTextSize(cfg.label, 12)[0] + 24;
                var color = cfg.color || cfg.style.stroke;
                return "\n          <group>\n            <rect draggable=\"true\" style={{width: " + (width + 20) + ", height: 26, fill: 'transparent' }}>\n              <text style={{ fontSize: 12, marginLeft: 12, marginTop: 6 }}>" + cfg.label + "</text>\n                  <text style={{ marginLeft: " + (width - 8) + ", marginTop: -10, stroke: " + color + ", fill: '#000', cursor: 'pointer', opacity: " + (cfg.hover ? 0.75 : 0) + ", next: 'inline' }} action=\"add\">+</text>\n                  <text style={{ marginLeft: " + (width - 4) + ", marginTop: -10, stroke: " + color + ", fill: '#000', cursor: 'pointer', opacity: " + (cfg.hover ? 0.75 : 0) + ", next: 'inline' }} action=\"delete\">-</text>\n            </rect>\n            <rect style={{ fill: " + color + ", width: " + (width + 24) + ", height: 2, x: 0, y: 32 }} />\n            \n          </group>\n        ";
            },
            getAnchorPoints: function () {
                return [
                    [0, 0.965],
                    [1, 0.965],
                ];
            },
        }, "single-node");
        registerBehavior("dice-mindmap", {
            getEvents: function () {
                return {
                    "node:click": "clickNode",
                    "node:dblclick": "editNode",
                    "node:mouseenter": "hoverNode",
                    "node:mouseleave": "hoverNodeOut",
                };
            },
            clickNode: function (evt) {
                var _a, _b, _c;
                var model = evt.item.get("model");
                var name = (_a = evt.target) === null || _a === void 0 ? void 0 : _a.get("action");
                switch (name) {
                    case "add":
                        var newId = model.id +
                            "-" +
                            ((((_b = model.children) === null || _b === void 0 ? void 0 : _b.reduce(function (a, b) {
                                var num = Number(b.id.split("-").pop());
                                return a < num ? num : a;
                            }, 0)) || 0) +
                                1);
                        evt.currentTarget.updateItem(evt.item, {
                            children: (model.children || []).concat([
                                {
                                    id: newId,
                                    direction: newId.charCodeAt(newId.length - 1) % 2 === 0
                                        ? "right"
                                        : "left",
                                    label: "New",
                                    type: "dice-mind-map-leaf",
                                    color: model.color ||
                                        colorArr[Math.floor(Math.random() * colorArr.length)],
                                },
                            ]),
                        });
                        evt.currentTarget.refreshLayout(false);
                        break;
                    case "delete":
                        var parent_1 = evt.item.get("parent");
                        evt.currentTarget.updateItem(parent_1, {
                            children: (((_c = parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.get("model")) === null || _c === void 0 ? void 0 : _c.children) || []).filter(function (e) { return e.id !== model.id; }),
                        });
                        evt.currentTarget.refreshLayout(false);
                        break;
                    case "edit":
                        break;
                    default:
                        return;
                }
            },
            editNode: function (evt) {
                var item = evt.item;
                var model = item.get("model");
                var _a = item.calculateBBox(), x = _a.x, y = _a.y;
                var graph = evt.currentTarget;
                var realPosition = evt.currentTarget.getClientByPoint(x, y);
                var el = document.createElement("div");
                var fontSizeMap = {
                    "dice-mind-map-root": 24,
                    "dice-mind-map-sub": 18,
                    "dice-mind-map-leaf": 16,
                };
                el.style.fontSize = fontSizeMap[model.type] + "px";
                el.style.position = "fixed";
                el.style.top = realPosition.y + "px";
                el.style.left = realPosition.x + "px";
                el.style.paddingLeft = "12px";
                el.style.transformOrigin = "top left";
                el.style.transform = "scale(" + evt.currentTarget.getZoom() + ")";
                var input = document.createElement("input");
                input.style.border = "none";
                input.value = model.label;
                input.style.width =
                    (Util.getTextSize(model.label, fontSizeMap[model.type])[0]) +
                        "px";
                input.className = "dice-input";
                el.className = "dice-input";
                el.appendChild(input);
                document.body.appendChild(el);
                var destroyEl = function () {
                    document.body.removeChild(el);
                };
                var clickEvt = function (event) {
                    var _a;
                    if (!((_a = event === null || event === void 0 ? void 0 : event.target["className"]) === null || _a === void 0 ? void 0 : _a.includes("dice-input"))) {
                        window.removeEventListener("mousedown", clickEvt);
                        window.removeEventListener("scroll", clickEvt);
                        graph.updateItem(item, { label: input.value });
                        graph.refreshLayout(false);
                        graph.off('wheelZoom', clickEvt);
                        destroyEl();
                    }
                };
                graph.on('wheelZoom', clickEvt);
                window.addEventListener("mousedown", clickEvt);
                window.addEventListener("scroll", clickEvt);
                input.addEventListener("keyup", function (event) {
                    if (event.key === "Enter") {
                        clickEvt({ target: {} });
                    }
                });
            },
            hoverNode: function (evt) {
                evt.currentTarget.updateItem(evt.item, { hover: true });
            },
            hoverNodeOut: function (evt) {
                evt.currentTarget.updateItem(evt.item, { hover: false });
            },
        });
        registerBehavior("scroll-canvas", {
            getEvents: function getEvents() {
                return {
                    wheel: "onWheel",
                };
            },
            onWheel: function onWheel(ev) {
                var graph = this.graph;
                if (!graph) {
                    return;
                }
                if (ev.ctrlKey) {
                    var canvas = graph.get("canvas");
                    var point = canvas.getPointByClient(ev.clientX, ev.clientY);
                    var ratio = graph.getZoom();
                    if (ev.wheelDelta > 0) {
                        ratio += ratio * 0.05;
                    }
                    else {
                        ratio *= ratio * 0.05;
                    }
                    graph.zoomTo(ratio, {
                        x: point.x,
                        y: point.y,
                    });
                }
                else {
                    var x = ev.deltaX || ev.movementX;
                    var y = ev.deltaY || ev.movementY;
                    graph.translate(-x, -y);
                }
                ev.preventDefault();
            },
        });
    };
    MindMapGraph.prototype.afterRender = function () {
        var _this = this;
        var changeEdge = function () {
            return _this.graph.getEdges().forEach(function (e) {
                return _this.graph.updateItem(e, {
                    style: { stroke: e.getTarget().get("model").color, lineWidth: 2 },
                });
            });
        };
        changeEdge();
        this.graph.on("afterlayout", changeEdge);
    };
    MindMapGraph.prototype.saveData = function () {
        var data = this.graph.save();
        var chanegData = function (data) {
            var direction = data.direction, id = data.id, label = data.label, color = data.color, children = data.children;
            var newData = { direction: direction, id: id, label: label, color: color };
            if (children) {
                newData.children = data.children.map(function (e) { return chanegData; });
            }
            return newData;
        };
        return chanegData(data);
    };
    return MindMapGraph;
}(TreeGraph));
export default MindMapGraph;
//# sourceMappingURL=MindMapGraph.js.map