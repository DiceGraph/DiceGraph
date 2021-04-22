import { GraphOptions } from "@antv/g6";
import DiceGraph from "../base/DiceGraph";
declare type FamilyTreeNode = {
    img?: string;
    desc: string;
    name: string;
    children?: FamilyTreeNode[];
    mate?: FamilyTreeNode;
};
export declare const familyTreeGraphOption: {
    fitView: boolean;
    layout: {
        type: string;
    };
    modes: {
        default: string[];
    };
    defaultNode: {
        size: number[];
        type: string;
        anchorPoints: number[][];
    };
    defaultEdge: {
        type: string;
        style: {
            lineWidth: number;
        };
    };
    plugins: import("_@antv_g6-plugin@0.2.7@@antv/g6-plugin").Tooltip[];
};
export default class FamilyTreeGraph extends DiceGraph<FamilyTreeNode> {
    constructor(userConfig: Partial<GraphOptions>);
    dataTransform(data: any): {
        nodes: any[];
        edges: any[];
    };
    registerCustomSetting(): void;
}
export {};
