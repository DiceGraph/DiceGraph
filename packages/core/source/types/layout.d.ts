declare namespace Layout {
  type Basic = {
    /** Center of Layout */
    center?: [number, number];
    /** Width of Layout */
    width?: number;
    /** Height of Layout */
    height?: number;
  }
  type Random = {
    type: "random";
    /** Use Webworker to not block browser  */
    workerEnabled?: boolean;
  } & Basic;
  type Circular = {
    type: "circular";
    /** Fixed radius of circle */
    radius?: number;
    /** Start radius of circular, not working with radius or without endAngle */
    startRadius?: number;
    /** End radius of circular, not working with radius or without startAngle */
    endRadius?: number;
    /** Start angle */
    startAngle?: number;
    /** End angle */
    endAngle?: number;
    /** If the circular is clockwise */
    clockwise?: boolean;
    /** When endRadius - startRadius != 0, divide circular */
    divisions?: number;
    /** Order of points: 'topology', 'degree', 'topology-directed' */
    ordering?: "topology" | "topology-directed" | "degree";
  };
  type Concentric = {
    type: "concentric";
    /** Node size number for radius, [number, number] for width and height */
    nodeSize?: number | [number, number];
    /** Min spacing between outside of nodes (used for radius adjustment) */
    minNodeSpacing?: number;
    /** Prevents node overlap, may overflow boundingBox if not enough space */
    preventOverlap?: boolean;
    /** How many radians should be between the first and last node (defaults to full circle) */
    sweep?: number | undefined;
    /** Whether levels have an equal radial distance betwen them, may cause bounding box overflow */
    equidistant?: boolean;
    /** Where nodes start in radians */
    startAngle?: number;
    /** Whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false) */
    clockwise?: boolean;
    /** The letiation of concentric values in each level */
    maxLevelDiff?: number;
    /** Sort by key, the key value higher the position more centered */
    sortBy?: string;
  };
  type Layouts = Random | Circular | Concentric;
}
