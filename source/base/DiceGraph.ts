import G6, { Graph } from "@antv/g6/es";
import { GraphData, GraphOptions } from "@antv/g6/es/types";
import { generateStyleFromColor } from "../util/color";

export default class DiceGraph<DataType = {}, ConfigType = {}> {
  // g6 graph to use
  protected graph: Graph | null = null;

  protected G6Core = G6;

  protected data: DataType | GraphData;

  protected tree = false;

  protected el: HTMLElement;

  protected config: GraphOptions;

  protected colors : {
    color?: string,
    bgColor?: string,
  } = {
    color: "#096dd9",
    bgColor: "#fff",
  };

  constructor(config: Partial<GraphOptions> = {}, colors: DiceGraph['colors'] = {}) {
    if (config) {
      const color = {...colors, ...this.colors};
      const { stateStyles, style } = generateStyleFromColor(
        color.color || "#096dd9",
        color.bgColor || "#fff"
      );
      this.config = {
        ...this.config,
        ...config,
        nodeStateStyles: stateStyles,
        defaultNode: {
          ...(config.defaultNode || {}),
          style: {
            ...(config.defaultNode?.style || {}),
            ...style,
          },
        },
      };
    }

    this.registerCustomSetting();
  }

  public getGraph = () => {
    return this.graph;
  };

  protected createGraph = (el: HTMLElement | string) => {
    let target: HTMLElement | undefined;
    if (typeof el === "string") {
      target = document.getElementById(el);
    } else {
      target = el;
    }
    if (target) {
      this.el = target;
      const width = target.clientWidth;
      const height = target.clientHeight;
      const mixConfig = {
        container: el,
        width,
        height,
        ...this.config,
      }
      return new G6.Graph(mixConfig);
    } else {
      console.warn(el, "mount element was not found");
      return null;
    }
  };

  public mount(el: HTMLElement | string) {
    this.graph = this.createGraph(el);

    if (!this.graph) {
      return;
    }
    if (this.beforeRender) {
      this.beforeRender();
    }
    this.graph.data(this.data);
    this.graph.render();
    if (this.afterRender) {
      this.afterRender();
    }
  }

  public setData = (data: DataType) => {
    this.checkData(data);
    this.data = this.dataTransform(data);

    if (this.graph) {
      this.graph.changeData(this.data);
    }
    return this;
  };

  public getData = () => {
    if (this.graph) {
      return this.graph.get("data") as DataType;
    }
  };

  protected registerCustomSetting(): void {}

  protected checkData = (data: DataType) => {
    return true;
  };

  public dataTransform(data: DataType): DataType | GraphData {
    return data;
  }

  public beforeRender(): void {}

  public afterRender(): void {}

  public render(): void {
    if (this.graph) {
      this.graph.render();
    }
  }
}
