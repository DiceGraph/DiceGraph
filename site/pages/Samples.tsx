import React from "react";
import SampleCard from "../compoents/SampleCard";
import graph from '../graph';

export default () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Object.entries(graph).map(([k, v]) => (
        <SampleCard name={k} img={v.img} title={v.title} desc={v.description} />
      ))}
    </div>
  );
};
