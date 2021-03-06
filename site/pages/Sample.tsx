import React from "react";
import Helmet from "react-helmet";
import { useGraph } from "../hooks";
import graph from '../graph';

const flatGraph = Object.values(graph).reduce(
  (a, b) => Object.assign(a, b), {}
)

export default (props) => {
  const { match } = props;
  const { params: { name } } = match;
  const target = flatGraph[name];
  const { data, GraphClass, title, description, config = {}, structure, className } = target;
  const [el] = useGraph(GraphClass, data, config)

  return (
    <div>
      <Helmet>
        <title>DiceGraph - {title}</title>
      </Helmet>
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
        <div
          style={{ width: 800, height: 600, borderRight: "1px solid #ddd" }}
          ref={el}
        />
        <div style={{ width: 400, height: 600, padding: 20 }}>
          <h5>How to use</h5>
          <pre className="code-pool">
            {
              `
import { ${className} } from 'dice-graph';

const instance = new ${className}();

// DOM node that your graph render
const el = document.getElementById('target');
const data = { ...your data };

instance.setData(data);
instance.mount(el);
              
              `
            }
          </pre>
          <h5>
        Data Structure
      </h5>
      <pre className="code-pool" style={{ height: 120 }}>
        {JSON.stringify(structure, null, 2)}
      </pre>
        </div>
      </div>
      
      <h5>
        Data Sample
      </h5>
      <pre className="code-pool">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};
