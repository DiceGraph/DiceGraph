import { GraphOptions } from "@antv/g6";
import TreeGraph from "../base/TreeGraph";
export declare type MindMapGraphNode = {
    direction?: "left" | "right";
    id: string;
    label: string;
    color?: string;
    children?: MindMapGraphNode[];
};
export declare const mindMapGraphOption: {
    fitView: boolean;
    fitViewPadding: number[];
    layout: {
        type: string;
        direction: string;
        getHeight: () => number;
        getWidth: (node: any) => any;
        getVGap: () => number;
        getHGap: () => number;
        getSide: (node: any) => any;
    };
    defaultEdge: {
        type: string;
        style: {
            lineWidth: number;
        };
    };
    minZoom: number;
    modes: {
        default: string[];
    };
};
export default class MindMapGraph extends TreeGraph<MindMapGraphNode> {
    constructor(userConfig?: Partial<GraphOptions>);
    dataTransform(data: any): any;
    protected registerCustomSetting(): void;
    afterRender(): void;
    saveData(): MindMapGraphNode;
}
