import { GraphOptions } from "@antv/g6";

const mixObject = <T>(a?: T, b?: T) => {
  return {
    ...(a || {}),
    ...(b || {})
  } as T
}

export const mixConfig = (graphConfig?: Partial<GraphOptions>, userConfig?: Partial<GraphOptions>) => {
  return {
    ...mixObject(graphConfig, userConfig),
    defaultNode: mixObject(graphConfig.defaultNode, userConfig.defaultNode),
    defaultEdge: mixObject(graphConfig.defaultEdge, userConfig.defaultEdge),
    defaultCombo: mixObject(graphConfig.defaultCombo, userConfig.defaultCombo),
    layout: mixObject(graphConfig.layout, userConfig.layout),
    nodeStateStyles: mixObject(graphConfig.nodeStateStyles, userConfig.nodeStateStyles),
    edgeStateStyles: mixObject(graphConfig.edgeStateStyles, userConfig.edgeStateStyles),
    comboStateStyles: mixObject(graphConfig.comboStateStyles, userConfig.comboStateStyles),
    modes: mixObject(graphConfig.modes, userConfig.modes)
  } as GraphOptions;
}