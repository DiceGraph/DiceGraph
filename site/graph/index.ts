import Angular from "./framework/Angular";
import FamilyTree from "./class/FamilyTree";
import Mindmap from "./class/Mindmap";
import DecisionGraph from "./class/DecisionGraph";
import React from "./framework/React";
import Vue from "./framework/Vue";
import ERGraph from "./class/ERGraph";
import SankeyGraph from "./class/SankeyGraph";

export default {
  Graph: {
    mindmap: Mindmap,
    familytree: FamilyTree,
    decisiongraph: DecisionGraph,
    er: ERGraph,
    sankey: SankeyGraph
  },
  FrameWork: {
    react: React,
    angular: Angular,
    vue: Vue,
  },
};
