"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionGraph = exports.FamilyTreeGraph = exports.MindMapGraph = void 0;
var MindMapGraph_1 = require("./graph/MindMapGraph");
exports.MindMapGraph = MindMapGraph_1.default;
var FamilyTreeGraph_1 = require("./graph/FamilyTreeGraph");
exports.FamilyTreeGraph = FamilyTreeGraph_1.default;
var DecisionGraph_1 = require("./graph/DecisionGraph");
exports.DecisionGraph = DecisionGraph_1.default;
exports.default = {
    MindMapGraph: MindMapGraph_1.default, FamilyTreeGraph: FamilyTreeGraph_1.default, DecisionGraph: DecisionGraph_1.default
};
//# sourceMappingURL=index.js.map