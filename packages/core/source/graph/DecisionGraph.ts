import { Util, registerNode, registerEdge } from "@antv/g6";
import { GraphOptions, EdgeConfig } from "@antv/g6";
import DiceGraph from "../base/DiceGraph";
import { mixConfig } from "../util/config";

type DecisionNode = {
  label: string;
  id: string;
  options?: {
    [option: string]: string;
  };
};

export const decisionGraphOptions = {
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

export default class DecisionGraph extends DiceGraph<DecisionNode[]> {
  constructor(userConfig: Partial<GraphOptions>) {
    super(mixConfig(decisionGraphOptions, userConfig));
  }

  dataTransform(data: DecisionNode[]) {
    const edges = [] as EdgeConfig[];
    const nodes = data.map((d) => {
      if (d.options) {
        Object.keys(d.options)
          .sort()
          .forEach((e, i) => {
            edges.push({
              type: "dice-decision-edge",
              source: d.id,
              target: d.options[e],
              label: e,
              index: i,
            });
          });
      }

      const width = Math.max(
        Util.getTextSize(d.label, 14)[0] + 20,
        Object.keys(d.options || {}).length * 40
      );

      return {
        width,
        size: [width, 40],
        ...d,
        type: "dice-decision-node",
      };
    });

    return {
      nodes,
      edges,
    };
  }

  registerCustomSetting() {
    registerNode(
      "dice-decision-node",
      {
        jsx: (cfg) => {
          const { options = {} } = cfg;
          const optLen = Object.keys(options).length;
          const gap = 40;
          const startX = Number(cfg.width) / 2 - (gap * (optLen - 1)) / 2;

          return `<group>
          <rect draggable="true" style={{ width: ${
            cfg.width
          }, height: 40, fill: #ffffff, stroke: #5B8FF9, radius: 8, lineWidth: 3 }}>
            <text style={{ fontSize: 14, marginLeft: ${ Number(cfg.width) / 2 }, marginTop: 10, textAlign: center }}>${
              cfg.label
            }</text>
            ${
              optLen
                ? Object.keys(options).map((e, i) => {
                    return `<circle style={{ marginLeft: ${
                      startX + i * gap
                    }, marginTop: ${
                      i ? 0 : 23
                    }, fill: #fff, stroke: #5B8FF9, lineWidth: 3, r: 4, next: inline }} />`;
                  })
                : ""
            }
          </rect>
        </group>
      `;
        },
        getAnchorPoints() {
          return [
            [0.5, 0],
            [0.5, 1],
          ];
        },
      },
      "single-node"
    );

    registerEdge('dice-decision-edge', {
      getPathPoints: (cfg: EdgeConfig) => {
        const { options = {} } = this.graph.findById(cfg.source).get('model');
          const optLen = Object.keys(options).length;
          const gap = 40;
          const startX = cfg.startPoint.x - (optLen - 1) * gap / 2 + gap * Number(cfg.index);

        return {
          ...cfg,
          startPoint: {
            ...cfg.startPoint,
            x: startX,
          }
        }
      }, 

    }, "polyline")
  }
}
