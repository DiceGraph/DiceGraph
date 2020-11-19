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
      return new this.G6Core.TreeGraph(mixConfig);
    } else {
      console.warn(el, "mount element was not found");
      return null;
    }
  };
}