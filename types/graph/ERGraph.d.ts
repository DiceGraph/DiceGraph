import { GraphOptions } from "@antv/g6";
import DiceGraph from "../base/DiceGraph";
declare type ERRelation = {
    nodeId: string;
    key: string;
    label?: string;
};
declare type ERAttr = {
    key: string;
    type: string;
    relation: ERRelation[];
};
declare type ERNode = {
    label: string;
    id: string;
    attrs: ERAttr[];
};
export default class ERGraph extends DiceGraph<ERNode[]> {
    constructor(userConfig: GraphOptions);
    dataTransform(data: ERNode[]): {
        nodes: any[];
        edges: any[];
    };
    registerCustomSetting(): void;
}
export {};
