import React from "react";
import SampleCard from "../compoents/SampleCard";
import graph from '../graph';

export default () => {
  return (
    <div>
      {Object.entries(graph).map(([key, obj]) => (
        <>
        <h3>{key}</h3>
        <div key={key} style={{ display: "flex", flexWrap: "wrap" }}>
          {
            Object.entries(obj).map(([k, v]) => <SampleCard key={k} name={k} img={v.img} title={v.title} desc={v.description} type={v.type} />)
          }
        </div>
        </>
      ))}
    </div>
  );
};
