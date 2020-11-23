import * as React from "react";
import ReactDOM from "react-dom";
import classnames from 'classnames';
import { HashRouter, Route, Switch, Link } from "react-router-dom";

import './index.less';
import Samples from "./pages/Samples";
import Sample from "./pages/Sample";
import Iframe from "./pages/Iframe";

import logo from './assets/DiceGraph.png'

const NavBar = props => {
  const { location: { pathname } } = props;
  const links = [{
    to: '/',
    title: 'Samples' 
  }, {
    href: 'https://github.com/DiceGraph/DiceGraph',
    title: 'Github' 
  }]

  return <div style={{ width: '100%', display: 'flex', margin: '30px auto' }}>
    {
      links.map(e => <div key={e.to} className={classnames("nav-link", pathname === (e.to) && 'active')}>
      {e.to && <Link to={e.to}>{e.title}</Link>}
      {e.href && <a href={e.href} target="_blank">{e.title}</a>}
    </div>)
    }
</div>
}

const App = () => (
  <HashRouter>
    <div
      style={{
        background: "#fff",
        width: "100vw",
        minHeight: "100vh",
        padding: 36,
        boxSizing: 'border-box',
      }}
    >
      <div>
      <img width={36} height={36} src={logo} />
        <h1>Dice Graph</h1>
        <h4 style={{ color: "#777", fontWeight: 200 }}>
          To use graph with data out of box, for many scenes.
        </h4>
      </div>
      <Switch>
        <NavBar/>
      </Switch>
      <div>
        <Switch>
          <Route path="/" exact component={Samples}/>
          <Route path="/sample/render/:name" component={Sample} exact />
          <Route path="/sample/iframe/:name" component={Iframe} exact />
        </Switch>
      </div>
    </div>
  </HashRouter>
);

ReactDOM.render(<App />, document.getElementById("mountNode"));
