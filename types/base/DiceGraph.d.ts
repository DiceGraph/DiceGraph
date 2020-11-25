import { Graph } from "@antv/g6/es";
import { GraphData, GraphOptions } from "@antv/g6/es/types";
export default class DiceGraph<DataType = {}, ConfigType = {}> {
    protected graph: Graph | null;
    protected data: DataType | GraphData;
    protected tree: boolean;
    protected el: HTMLElement;
    protected config: GraphOptions;
    protected colors: {
        color?: string;
        bgColor?: string;
    };
    constructor(config?: Partial<GraphOptions>, colors?: DiceGraph['colors']);
    getGraph: () => Graph;
    protected createGraph: (el: HTMLElement | string) => Graph;
    mount(el: HTMLElement | string): void;
    setData: (data: DataType) => this;
    getData: () => DataType;
    protected registerCustomSetting(): void;
    protected checkData(data: DataType): boolean;
    dataTransform(data: DataType): DataType | GraphData;
    beforeRender(): void;
    afterRender(): void;
    render(): void;
}
