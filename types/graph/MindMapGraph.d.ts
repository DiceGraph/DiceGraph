import TreeGraph from "../base/TreeGraph";
export declare type MindMapGraphNode = {
    direction?: 'left' | 'right';
    id: string;
    label: string;
    color?: string;
    children?: MindMapGraphNode[];
};
export default class MindMapGraph extends TreeGraph<MindMapGraphNode> {
    constructor(userConfig: any);
    dataTransform(data: any): any;
    protected registerCustomSetting(): void;
    afterRender(): void;
}
