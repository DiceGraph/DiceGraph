import { GraphOptions, EdgeConfig } from "@antv/g6";
import DiceGraph from "../base/DiceGraph";
declare type DecisionNode = {
    label: string;
    id: string;
    options?: {
        [option: string]: string;
    };
};
export declare const decisionGraphOptions: {
    fitView: boolean;
    fitViewPadding: number[];
    layout: {
        type: string;
        controlPoints: boolean;
        nodesep: number;
    };
    modes: {
        default: string[];
    };
    defaultEdge: {
        style: {
            lineWidth: number;
            stroke: string;
        };
        labelCfg: {
            position: string;
            refX: number;
            style: {
                textAlign: string;
                stroke: string;
                lineWidth: number;
            };
        };
    };
};
export default class DecisionGraph extends DiceGraph<DecisionNode[]> {
    constructor(userConfig: Partial<GraphOptions>);
    dataTransform(data: DecisionNode[]): {
        nodes: {
            type: string;
            label: string;
            id: string;
            options?: {
                [option: string]: string;
            };
            width: number;
            size: number[];
        }[];
        edges: EdgeConfig[];
    };
    registerCustomSetting(): void;
}
export {};
