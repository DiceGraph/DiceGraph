import DiceGraph from "../base/DiceGraph";
declare type FamilyTreeNode = {
    img?: string;
    desc: string;
    name: string;
    children?: FamilyTreeNode[];
    mate?: FamilyTreeNode;
};
export default class FamilyTreeGraph extends DiceGraph<FamilyTreeNode> {
    constructor();
    dataTransform(data: any): {
        nodes: any[];
        edges: any[];
    };
    registerCustomSetting(): void;
}
export {};
