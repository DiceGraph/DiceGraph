import { GraphOptions } from "@antv/g6/es/types";
import DiceGraph from "../base/DiceGraph";
declare type SankeyTo = {
    target: string;
    value: number;
};
declare type SankeyNode = {
    label: string;
    color?: string;
    id: string;
    to?: SankeyTo[];
};
export default class SankeyGraph extends DiceGraph<SankeyNode[]> {
    constructor(useConfig: GraphOptions);
    dataTransform(data: SankeyNode[]): {
        nodes: any[];
        edges: any[];
    };
    registerCustomSetting(): void;
}
export {};
