import React from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import * as ReactEx from "./react-router";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/basic">Basic</Link>
            </li>
            <li>
              <Link to="/urlparams">URL Params</Link>
            </li>
          </ul>

          <Switch>
            <Route exact path="/">
              <div>Home</div>
            </Route>
            <Route path="/basic">
              <ReactEx.Basic />
            </Route>
            <Route path="/urlparams">
              <ReactEx.UrlParams />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
