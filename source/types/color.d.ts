declare namespace ColorPattern {
  type colorPair = {
    stroke?: string;
    fill?: string;
  };

  type colorVar = {
    color: string;
    bgColor: string;
    stroke: string;
    fill: string;
    shadow: string;
    disable: colorPair;
    hightlight: colorPair;
    inactive: colorPair;
  }
}