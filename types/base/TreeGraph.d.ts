import DiceGraph from "./DiceGraph";
export default class TreeGraph<DataType> extends DiceGraph<DataType> {
    protected createGraph: (el: HTMLElement | string) => import("@antv/g6/es").TreeGraph;
}
