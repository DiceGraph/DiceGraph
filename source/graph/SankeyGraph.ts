import { registerEdge, registerNode } from "@antv/g6/es";
import { GraphOptions } from "@antv/g6/es/types";
import source from "..";
import DiceGraph from "../base/DiceGraph";
import { colorArr } from "../util/color";
import { mixConfig } from "../util/config";

type SankeyTo = {
  target: string,
  value: number
}

type SankeyNode = {
  label: string,
  color?: string,
  id: string,
  to?: SankeyTo[]
}

export default class SankeyGraph extends DiceGraph<SankeyNode[]> {
  constructor(useConfig: GraphOptions) {
    super(mixConfig({
      defaultNode: {
        type: 'dice-sankey-node'
      },
      defaultEdge: {
        type: 'dice-sankey-edge'
      },
      fitView:true,
      layout: {
        type: 'dagre',
        rankdir: 'LR',
        nodesep: 10,
        ranksep: 200,
        align: 'ul'
      }
    }, useConfig));
  }

  dataTransform(data: SankeyNode[]) {
    const nodes = [];
    const edges = [];
    const nodeRecvMap = {};

    data.forEach((node, i) => {
      const { id, label, color = colorArr[(i % colorArr.length)], to = [] } = node;
      
      let index = 0;
      to.forEach(rel => {
          edges.push({
            source: id,
            target: rel.target,
            value: rel.value,
            color,
            sourceIndex: index,
            targetIndex: (nodeRecvMap[rel.target] || 0)
          });
          index += rel.value || 0;
          if (rel.value) {
            nodeRecvMap[rel.target] = (nodeRecvMap[rel.target] || 0) + rel.value;
          }
        }
      )
      nodes.push({ id, label, color, outSize: index });
    })

    nodes.forEach(
      node => { 
        node.inSize = nodeRecvMap[node.id] || 0;
        node.size = [4, Math.max(4, node.inSize, node.outSize)]
      }
    )

    return {
      nodes, edges
    }
  }
  registerCustomSetting() {
    registerNode('dice-sankey-node', {
      jsx: (cfg) => `
        <group>
          <rect style={{ width: ${cfg.size[0]}, height: ${cfg.size[1]}, fill: ${cfg.color} }} />
          <text style={{ marginLeft: 6, marginTop: 24,  fill: #333, stroke: ${cfg.color}, lineWidth: 2, fontSize: 24 }}>${cfg.label} ${cfg.size[1]}</text>
        </group>
      `,
      getAnchorPoints() {
        return [[0, 0]]
      }
    }, 'single-node');
    registerEdge('dice-sankey-edge', {
      draw(cfg, group) {
        const { startPoint, endPoint, color } = cfg;
        const deltaY1 = Number(cfg.sourceIndex);
        const deltaY2 = Number(cfg.sourceIndex) + Number(cfg.value);
        const deltaY3 = Number(cfg.targetIndex);
        const deltaY4 = Number(cfg.targetIndex) + Number(cfg.value);
        const quaterX = Math.abs(endPoint.x - startPoint.x) / 5 * 3
        return group.addShape('path', {
          attrs: {
            fill: color,
            opacity: 0.6,
            path: [
              ['M', startPoint.x, startPoint.y + deltaY1],
              ['C', endPoint.x - quaterX, startPoint.y + deltaY1, startPoint.x + quaterX, endPoint.y + deltaY3, endPoint.x, endPoint.y + deltaY3],
              ['L', endPoint.x, endPoint.y + deltaY4],
              ['C', startPoint.x +quaterX, endPoint.y + deltaY4, endPoint.x - quaterX,  startPoint.y + deltaY2, startPoint.x, startPoint.y + deltaY2],
              ['L', startPoint.x, startPoint.y + deltaY1],
              ['Z']
            ]
          }
        })
      }
    })
  }
}