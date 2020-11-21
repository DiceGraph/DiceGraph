import * as React from 'react';
import { useHistory } from 'react-router-dom';

export default (props) => {
  const history = useHistory();
  return <div className="sample-card" onClick={() => { history.push(`/sample/${props.type}/${props.name}`) }}>
    <div className="sample-img" style={{ textAlign: 'center' }}>
      <img height={200} src={props.img}/>
    </div>
    <h3 style={{ marginTop: 30, cursor: 'pointer' }}>{props.title}</h3>
    <p style={{ color: '#999', fontSize: 14 }}>{props.desc}</p>
  </div>
}