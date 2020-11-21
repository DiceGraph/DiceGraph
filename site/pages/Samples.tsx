import React from "react";
import Helmet from "react-helmet";
import SampleCard from "../compoents/SampleCard";
import graph from '../graph';

export default () => {
  return (
    <div>
      <Helmet>
        <title>DiceGraph - Graph out of box</title>
      </Helmet>
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
