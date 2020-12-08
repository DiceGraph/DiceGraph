"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SankeyGraph = exports.ERGraph = exports.DecisionGraph = exports.FamilyTreeGraph = exports.MindMapGraph = void 0;
var MindMapGraph_1 = require("./graph/MindMapGraph");
exports.MindMapGraph = MindMapGraph_1.default;
var FamilyTreeGraph_1 = require("./graph/FamilyTreeGraph");
exports.FamilyTreeGraph = FamilyTreeGraph_1.default;
var DecisionGraph_1 = require("./graph/DecisionGraph");
exports.DecisionGraph = DecisionGraph_1.default;
var ERGraph_1 = require("./graph/ERGraph");
exports.ERGraph = ERGraph_1.default;
var SankeyGraph_1 = require("./graph/SankeyGraph");
exports.SankeyGraph = SankeyGraph_1.default;
exports.default = {
    MindMapGraph: MindMapGraph_1.default, FamilyTreeGraph: FamilyTreeGraph_1.default, DecisionGraph: DecisionGraph_1.default, ERGraph: ERGraph_1.default, SankeyGraph: SankeyGraph_1.default
};
//# sourceMappingURL=index.js.map