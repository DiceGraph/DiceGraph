import { TreeGraph as G6Tree } from '@antv/g6/es';
import DiceGraph from "./DiceGraph";
export default class TreeGraph<DataType> extends DiceGraph<DataType> {
    protected createGraph: (el: HTMLElement | string) => G6Tree;
}
