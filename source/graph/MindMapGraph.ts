import { Util, registerNode, registerBehavior, registerEdge } from "@antv/g6";
import { GraphOptions } from "@antv/g6";
import TreeGraph from "../base/TreeGraph";
import { colorArr } from "../util/color";
import { mixConfig } from "../util/config";

export type MindMapGraphNode = {
  direction?: "left" | "right";
  id: string;
  label: string;
  color?: string;
  children?: MindMapGraphNode[];
};

export const mindMapGraphOption = {
  fitView: true,
  fitViewPadding: [10, 20],
  layout: {
    type: "mindmap",
    direction: "H",
    getHeight: () => {
      return 16;
    },
    getWidth: (node) => {
      return node.level === 0
        ? Util.getTextSize(node.label, 16)[0] + 12
        : Util.getTextSize(node.label, 12)[0];
    },
    getVGap: () => {
      return 10;
    },
    getHGap: () => {
      return 60;
    },
    getSide: (node) => {
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
    default: ["drag-canvas", "zoom-canvas","dice-mindmap"],
  },
};

export default class MindMapGraph extends TreeGraph<MindMapGraphNode> {
  constructor(userConfig?: Partial<GraphOptions>) {
    super(mixConfig(mindMapGraphOption, userConfig));
    this.tree = true;
  }

  public dataTransform(data) {
    const changeData = (d, level = 0, color?) => {
      const data = { ...d };
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
        data.children = d.children.map((child) =>
          changeData(child, level + 1, data.color)
        );
      }
      return data;
    };
    return changeData(data);
  }

  protected registerCustomSetting() {
    registerNode(
      "dice-mind-map-root",
      {
        jsx: (cfg) => {
          const width = Util.getTextSize(cfg.label, 16)[0] + 24;
          const stroke = cfg.style.stroke || "#096dd9";
          const fill = cfg.style.fill;

          return `
          <group>
            <rect draggable="true" style={{width: ${width}, height: 42, stroke: ${stroke}, fill: ${fill}, radius: 4}} keyshape>
              <text style={{ fontSize: 16, marginLeft: 12, marginTop: 12 }}>${
                cfg.label
              }</text>
              <text style={{ marginLeft: ${
                width - 16
              }, marginTop: -20, stroke: '#66ccff', fill: '#000', cursor: 'pointer', opacity: ${
            cfg.hover ? 0.75 : 0
          } }} action="add">+</text>
            </rect>
          </group>
        `;
        },
        getAnchorPoints() {
          return [
            [0, 0.5],
            [1, 0.5],
          ];
        },
      },
      "single-node"
    );
    registerNode(
      "dice-mind-map-sub",
      {
        jsx: (cfg) => {
          const width = Util.getTextSize(cfg.label, 14)[0] + 24;
          const color = cfg.color || cfg.style.stroke;

          return `
          <group>
            <rect draggable="true" style={{width: ${
              width + 24
            }, height: 22}} keyshape>
              <text draggable="true" style={{ fontSize: 14, marginLeft: 12, marginTop: 6 }}>${
                cfg.label
              }</text>
              <text style={{ marginLeft: ${
                width - 8
              }, marginTop: -10, stroke: ${color}, fill: '#000', cursor: 'pointer', opacity: ${
            cfg.hover ? 0.75 : 0
          }, next: 'inline' }} action="add">+</text>
              <text style={{ marginLeft: ${
                width - 4
              }, marginTop: -10, stroke: ${color}, fill: '#000', cursor: 'pointer', opacity: ${
            cfg.hover ? 0.75 : 0
          }, next: 'inline' }} action="delete">-</text>
            </rect>
            <rect style={{ fill: ${color}, width: ${
            width + 24
          }, height: 2, x: 0, y: 22 }} />
            
          </group>
        `;
        },
        getAnchorPoints() {
          return [
            [0, 0.965],
            [1, 0.965],
          ];
        },
      },
      "single-node"
    );
    registerNode(
      "dice-mind-map-leaf",
      {
        jsx: (cfg) => {
          const width = Util.getTextSize(cfg.label, 12)[0] + 24;
          const color = cfg.color || cfg.style.stroke;

          return `
          <group>
            <rect draggable="true" style={{width: ${
              width + 20
            }, height: 26, fill: 'transparent' }}>
              <text style={{ fontSize: 12, marginLeft: 12, marginTop: 6 }}>${
                cfg.label
              }</text>
                  <text style={{ marginLeft: ${
                    width - 8
                  }, marginTop: -10, stroke: ${color}, fill: '#000', cursor: 'pointer', opacity: ${
            cfg.hover ? 0.75 : 0
          }, next: 'inline' }} action="add">+</text>
                  <text style={{ marginLeft: ${
                    width - 4
                  }, marginTop: -10, stroke: ${color}, fill: '#000', cursor: 'pointer', opacity: ${
            cfg.hover ? 0.75 : 0
          }, next: 'inline' }} action="delete">-</text>
            </rect>
            <rect style={{ fill: ${color}, width: ${
            width + 24
          }, height: 2, x: 0, y: 32 }} />
            
          </group>
        `;
        },
        getAnchorPoints() {
          return [
            [0, 0.965],
            [1, 0.965],
          ];
        },
      },
      "single-node"
    );
    registerBehavior("dice-mindmap", {
      getEvents() {
        return {
          "node:click": "clickNode",
          "node:dblclick": "editNode",
          "node:mouseenter": "hoverNode",
          "node:mouseleave": "hoverNodeOut",
        };
      },
      clickNode(evt) {
        const model = evt.item.get("model");
        const name = evt.target?.get("action");
        switch (name) {
          case "add":
            const newId =
              model.id +
              "-" +
              ((model.children?.reduce((a, b) => {
                const num = Number(b.id.split("-").pop());
                return a < num ? num : a;
              }, 0) || 0) +
                1);
            evt.currentTarget.updateItem(evt.item, {
              children: (model.children || []).concat([
                {
                  id: newId,
                  direction:
                    newId.charCodeAt(newId.length - 1) % 2 === 0
                      ? "right"
                      : "left",
                  label: "New",
                  type: "dice-mind-map-leaf",
                  color:
                    model.color ||
                    colorArr[Math.floor(Math.random() * colorArr.length)],
                },
              ]),
            });
            evt.currentTarget.refreshLayout(false);
            break;
          case "delete":
            const parent = evt.item.get("parent");
            evt.currentTarget.updateItem(parent, {
              children: (parent?.get("model")?.children || []).filter(
                (e) => e.id !== model.id
              ),
            });
            evt.currentTarget.refreshLayout(false);
            break;
          case "edit":
            break;
          default:
            return;
        }
      },
      editNode(evt) {
        const item = evt.item;
        const model = item.get("model");
        const { x, y } = item.calculateBBox();
        const graph = evt.currentTarget;
        const realPosition = evt.currentTarget.getClientByPoint(x, y);
        const el = document.createElement("div");
        const fontSizeMap = {
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
        el.style.transform = `scale(${evt.currentTarget.getZoom()})`;
        const input = document.createElement("input");
        input.style.border = "none";
        input.value = model.label;
        input.style.width =
          (Util.getTextSize(model.label, fontSizeMap[model.type])[0]) +
          "px";
        input.className = "dice-input";
        el.className = "dice-input";
        el.appendChild(input);
        document.body.appendChild(el);
        const destroyEl = () => {
          document.body.removeChild(el);
        };
        const clickEvt = (event) => {
          if (!event?.target["className"]?.includes("dice-input")) {
            window.removeEventListener("mousedown", clickEvt);
            window.removeEventListener("scroll", clickEvt);
            graph.updateItem(item, { label: input.value });
            graph.refreshLayout(false);
            graph.off('wheelZoom', clickEvt)
            destroyEl();
          }
        };
        graph.on('wheelZoom', clickEvt)
        window.addEventListener("mousedown", clickEvt);
        window.addEventListener("scroll", clickEvt);
        input.addEventListener("keyup", (event) => {
          if (event.key === "Enter") {
            clickEvt({ target: {} });
          }
        });
      },
      hoverNode(evt) {
        evt.currentTarget.updateItem(evt.item, { hover: true });
      },
      hoverNodeOut(evt) {
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
        const { graph } = this;
        if (!graph) {
          return;
        }
        if (ev.ctrlKey) {
          const canvas = graph.get("canvas");
          const point = canvas.getPointByClient(ev.clientX, ev.clientY);
          let ratio = graph.getZoom();
          if (ev.wheelDelta > 0) {
            ratio += ratio * 0.05;
          } else {
            ratio *= ratio * 0.05;
          }
          graph.zoomTo(ratio, {
            x: point.x,
            y: point.y,
          });
        } else {
          const x = ev.deltaX || ev.movementX;
          const y = ev.deltaY || ev.movementY;
          graph.translate(-x, -y);
        }
        ev.preventDefault();
      },
    });
  }

  afterRender() {
    const changeEdge = () =>
      this.graph.getEdges().forEach((e) =>
        this.graph.updateItem(e, {
          style: { stroke: e.getTarget().get("model").color, lineWidth: 2 },
        })
      );
    changeEdge();
    this.graph.on("afterlayout", changeEdge);
  }

  saveData() {
    const data = this.graph.save();
    const chanegData = (data) => {
      const { direction, id, label, color, children } = data;
      const newData: MindMapGraphNode = { direction, id, label, color };
      if (children) {
        newData.children = data.children.map((e) => chanegData);
      }
      return newData;
    };

    return chanegData(data);
  }
}
