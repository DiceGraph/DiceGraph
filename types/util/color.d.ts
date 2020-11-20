export declare const generateStyleFromColor: (front: any, back?: string) => {
    style: {
        stroke: any;
        fill: any;
    };
    stateStyles: {
        active: {
            lineWidth: number;
            stroke: any;
            shadow: any;
        };
        selected: {
            lineWidth: number;
            stroke: any;
            fill: string;
            shadow: any;
        };
        disable: {
            stroke: any;
            fill: any;
        };
        highlight: {};
        inactive: {
            stroke: any;
            fill: any;
        };
    };
};
