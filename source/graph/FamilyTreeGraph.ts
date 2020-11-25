import { Tooltip, registerLayout, registerNode, registerEdge } from "@antv/g6/es";
import { GraphOptions } from "@antv/g6/es/types";
import DiceGraph from "../base/DiceGraph";
import { mixConfig } from "../util/config";
import { textCut } from "../util/text";

type FamilyTreeNode = {
  img?: string;
  desc: string;
  name: string;
  children?: FamilyTreeNode[];
  mate?: FamilyTreeNode;
};

export const familyTreeGraphOption = {
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
      getContent(e) {
        const cfg = e.item.get("model");
        return `
      <div>
        <h4>${cfg.name}</h4>
        <p>${cfg.desc || ""}</p>
      </div>
      `;
      },
    }),
  ],
};

export default class FamilyTreeGraph extends DiceGraph<FamilyTreeNode> {
  constructor(userConfig: Partial<GraphOptions>) {
    super(mixConfig(familyTreeGraphOption, userConfig));
  }

  dataTransform(data) {
    const nodes = [];
    const edges = [];

    const readFamilyTree = (
      man: FamilyTreeNode,
      level = 0,
      startAtOffset = {
        node: 0,
        gap: 0,
      }
    ) => {
      const currentLevel = {
        node: 1,
        gap: 1,
      };

      if (man.children?.length) {
        man.children.forEach((child) => {
          edges.push({
            relation: "child",
            source: `${man.name}-${level}`,
            target: `${child.name}-${level + 1}`,
          });

          const res = readFamilyTree(child, level + 1, {
            node: startAtOffset.node + currentLevel.node - 0.5,
            gap: startAtOffset.gap + currentLevel.gap - 1,
          });
          currentLevel.node += res.node;
          currentLevel.gap += res.gap;
        });

        currentLevel.gap -= 1;
      }

      const node = {
        ...man,
        label: man.name,
        id: `${man.name}-${level}`,
        hasMate: man.mate,
        layoutInfo: { ...currentLevel, level, startAtOffset },
      } as { [key: string]: any };
      if (man.mate) {
        nodes.push({
          ...man.mate,
          label: man.mate.name,
          id: `${man.mate.name}-${level}`,
          mate: true,
          layoutInfo: { ...currentLevel, level, startAtOffset },
        });
      }
      nodes.push(node);

      return currentLevel;
    };

    readFamilyTree(data);

    return {
      nodes,
      edges,
    };
  }

  registerCustomSetting() {
    registerLayout("dice-family-tree", {
      execute() {
        this.layout(this);
      },
      layout(data) {
        const config = this.getDefaultCfg() || {};
        const { gapWidth = 20, gapHeight = 100 } = config;
        let { nodes } = data;
        const nodeWidth = 160 * 2;
        const nodeHeight = 60;

        nodes = nodes.map((n) => {
          const {
            node,
            level,
            gap,
            startAtOffset: { node: startNode, gap: startGap },
          } = n.layoutInfo as { [key: string]: any };
          const totalWidth = node * nodeWidth + gap * gapWidth;
          const startX =
            (startNode + 1) * nodeWidth + startGap * gapWidth + 100;
          const startY = level * (nodeHeight + gapHeight) + 100;

          if (n.hasMate) {
            n.x = startX + totalWidth / 2;
          } else if (n.mate) {
            n.x = startX + totalWidth / 2 - nodeWidth / 2;
          } else {
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
      jsx: (cfg) => `
        <group>
          <rect draggable="true" style={{ height: 60, width: 160, radius: 6, fill: #fff, shadowBlur: 5, shadowColor: #ddd, shadowOffsetX: 4, shadowOffsetY: 4 }}>
          <text style={{ marginLeft: 34, marginTop: ${
            cfg.desc ? 8 : 22
          }, fontWeight: bold, fontSize: 14 }}>${cfg.name}</text>
          <text style={{ marginLeft: 6, marginTop: 18 }}>${textCut(
            (cfg.desc || "") as string,
            26
          )}</text>
          </rect>
          <rect style={{ width: 24, height: 24, marginLeft: 6, marginTop: ${
            cfg.desc ? -56 : -42
          }, stroke: ${
        cfg.gender === "female"
          ? "#FF99C3"
          : cfg.gender === "male"
          ? "#5B8FF9"
          : "#999"
      }, lineWidth: 3 }} />
          ${
            cfg.img
              ? `<image style={{ marginLeft: 6, width: 24, height: 24, img: ${cfg.img}, radius: 12 }} />`
              : ""
          }
        </group>
      `,
      getAnchorPoints(cfg) {
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

    registerEdge(
      "dice-familytree-edge",
      {
        getControlPoints(cfg) {
          const { startPoint, endPoint } = cfg;
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
      },
      "polyline"
    );
  }
}
