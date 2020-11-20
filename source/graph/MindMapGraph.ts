import { GraphOptions } from "@antv/g6/es/types";
import TreeGraph from "../base/TreeGraph";

export type MindMapGraphNode = {
  direction?: 'left' | 'right',
  id: string,
  label: string,
  color?: string,
  children?: MindMapGraphNode[]
}

export default class MindMapGraph extends TreeGraph<MindMapGraphNode> {
  constructor(userConfig = {} as GraphOptions) {
    super({
      fitView: true,
      fitViewPadding: [10, 20],
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHeight: () => {
          return 16;
        },
        getWidth: (node) => {
          return node.level === 0 ? this.G6Core.Util.getTextSize(node.label, 16)[0] + 12 : this.G6Core.Util.getTextSize(node.label, 12)[0]
        },
        getVGap: () => {
          return 10;
        },
        getHGap: () => {
          return 60;
        },
        
      },
      defaultEdge: {
        type: 'cubic-horizontal',
        style: {
          lineWidth: 2,
        }
      },
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const data = item.get('model').data;
              data.collapsed = collapsed;
              return true;
            },
          },
          'drag-canvas',
          'zoom-canvas',
        ],
      },
      ...userConfig,
    });
    this.tree = true;
  }

  public dataTransform(data) {
    const changeData = (d, level = 0, color?) => {
      const data = {...d};
      switch (level) {
        case 0:
          data.type = 'dice-mind-map-root';
          break;
        case 1:
          data.type = 'dice-mind-map-sub';
          break;
        default:
          data.type = 'dice-mind-map-leaf'
          break;
      }

      if (color) {
        data.color = color;
      }

      if (d.children) {
        data.children = d.children.map(child => changeData(child, level + 1, data.color))
      }
      return data
    }
    return changeData(data);
  }

  protected registerCustomSetting() {
    const {G6Core} = this
    G6Core.registerNode('dice-mind-map-root', {
      jsx: (cfg) => {
        const width = G6Core.Util.getTextSize(cfg.label, 16)[0] + 24
        const stroke = cfg.style.stroke || '#096dd9';
        const fill = cfg.style.fill;

        return `
          <group>
            <rect style={{width: ${width}, height: 42, stroke: ${stroke}, fill: ${fill}, radius: 4}} keyshape>
              <text style={{ fontSize: 16, marginLeft: 12, marginTop: 12 }}>${cfg.label}</text>
            </rect>
          </group>
        `
      },
      getAnchorPoints() {
        return [[0, 0.5], [1, 0.5]]
      }
    }, 'single-node');
    G6Core.registerNode('dice-mind-map-sub', {
      jsx: (cfg) => {
        const width = G6Core.Util.getTextSize(cfg.label, 14)[0] + 24;
        const color = cfg.color || cfg.style.stroke;

        return `
          <group>
            <rect style={{width: ${width}, height: 22}}>
              <text style={{ fontSize: 14, marginLeft: 12, marginTop: 6 }}>${cfg.label}</text>
            </rect>
            <rect style={{ fill: ${color}, width: ${ width }, height: 4, x: 0, y: 22 }} />
          </group>
        `
      },
      getAnchorPoints() {
        return [[0, 1], [1, 1]]
      }
    }, 'single-node');
    G6Core.registerNode('dice-mind-map-leaf', {
      jsx: (cfg) => {
        const width = G6Core.Util.getTextSize(cfg.label, 12)[0] + 24;
        const color = cfg.color || cfg.style.stroke;

        return `
          <group>
            <rect style={{width: ${width}, height: 22 }}>
              <text style={{ fontSize: 12, marginLeft: 12, marginTop: 6 }}>${cfg.label}</text>
            </rect>
            <rect style={{ fill: ${color}, width: ${ width }, height: 2, x: 0, y: 32 }} />
          </group>
        `
      },
      getAnchorPoints() {
        return [[0, 1], [1, 1]]
      }
    }, 'single-node');
  }

  afterRender() {
    const changeEdge = () => this.graph.getEdges().forEach(e => this.graph.updateItem(e, { style: { stroke: e.getTarget().get('model').color, lineWidth: 2 } }));
    changeEdge();
    this.graph.on('afterlayout', changeEdge);
  }
}