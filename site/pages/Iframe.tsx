import React from "react";
import graph from "../graph";

const flatGraph = Object.values(graph).reduce(
  (a, b) => Object.assign(a, b), {}
)

export default (props) => {
  const { match } = props;
  const {
    params: { name },
  } = match;
  const target = flatGraph[name];
  const { src, title, description } = target;

  return (
    <div>
      <h4>{title}</h4>
      <p>{description}</p>
      <div
        className="sample-img"
        style={{
          display: "flex",
          width: 1200,
          minHeight: 600,
          margin: "40px auto",
        }}
      >
        <iframe
          style={{ width: 1200, height: 600 }}
          title="DiceGraph - React Example"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          src={src}
        />
      </div>
    </div>
  );
};
