import { TreeGraph as G6Tree } from '@antv/g6';
import DiceGraph from "./DiceGraph";

export default class TreeGraph<DataType> extends DiceGraph<DataType> {
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
      return new G6Tree(mixConfig);
    } else {
      console.warn(el, "mount element was not found");
      return null;
    }
  };
}