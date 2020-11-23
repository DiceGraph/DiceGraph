import * as BaseColor from 'color';
var Color = BaseColor;
if (typeof Color !== 'function') {
    Color = BaseColor.default;
}
export var generateStyleFromColor = function (front, back) {
    if (back === void 0) { back = '#fff'; }
    var color = Color(front);
    var bgColor = Color(back);
    return {
        style: {
            stroke: front,
            fill: bgColor.mix(color, 0.2).hex(),
        },
        stateStyles: {
            active: {
                lineWidth: 2,
                stroke: front,
                shadow: bgColor.mix(color, 0.1),
            },
            selected: {
                lineWidth: 3,
                stroke: front,
                fill: back,
                shadow: bgColor.mix(color, 0.1),
            },
            disable: {
                stroke: color.grayscale().hex(),
                fill: bgColor.mix(color, 0.2).grayscale().hex(),
            },
            highlight: {},
            inactive: {
                stroke: bgColor.mix(color, 0.5).hex(),
                fill: bgColor.mix(color, 0.1).hex(),
            },
        },
    };
};
//# sourceMappingURL=color.js.map