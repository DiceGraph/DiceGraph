import { GraphOptions } from "@antv/g6/es/types";
import TreeGraph from "../base/TreeGraph";
export declare type MindMapGraphNode = {
    direction?: 'left' | 'right';
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
    };
    defaultEdge: {
        type: string;
        style: {
            lineWidth: number;
        };
    };
    modes: {
        default: (string | {
            type: string;
            onChange: (item: any, collapsed: any) => boolean;
        })[];
    };
};
export default class MindMapGraph extends TreeGraph<MindMapGraphNode> {
    constructor(userConfig?: Partial<GraphOptions>);
    dataTransform(data: any): any;
    protected registerCustomSetting(): void;
    afterRender(): void;
}