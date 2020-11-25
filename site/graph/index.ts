import Angular from "./framework/Angular";
import FamilyTree from "./class/FamilyTree";
import Mindmap from "./class/Mindmap";
import DecisionGraph from "./class/DecisionGraph";
import React from "./framework/React";
import Vue from "./framework/Vue";

export default {
  Graph: {
    mindmap: Mindmap,
    familytree: FamilyTree,
    decisiongraph: DecisionGraph
  },
  FrameWork: {
    react: React,
    angular: Angular,
    vue: Vue,
  },
};
