import DiceGraph from "./DiceGraph";
export default class TreeGraph<DataType> extends DiceGraph<DataType> {
    protected createGraph: (el: HTMLElement | string) => import("_@antv_g6@4.0.0@@antv/g6/es").TreeGraph;
}
