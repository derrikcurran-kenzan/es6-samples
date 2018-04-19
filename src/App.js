import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import urlJoin from 'url-join';

import { NavItem } from './common';
import { Kata, kataPaths } from './katas';

import './App.css';

class App extends Component {
  render() {
    const cnRoot = 'App';
    return (
      <BrowserRouter>
        <div className={cnRoot}>
          <nav className={`${cnRoot}--nav`}>
            <h2>Katas</h2>
            <ul>
              {kataPaths.modules.map((kataPath, idx) => (
                <NavItem key={idx} to={urlJoin('/', kataPaths.root, kataPath)}>{kataPath}</NavItem>
              ))}
            </ul>

            <h2>Code Samples</h2>
            <ul>
              <li>Coming soon.</li>
            </ul>
          </nav>

          <div className={`${cnRoot}--content`}>
            <Switch>
              <Route path={urlJoin('/', kataPaths.root, ':kataPath+')} component={Kata} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
