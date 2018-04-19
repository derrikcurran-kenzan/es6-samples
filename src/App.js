import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import urlJoin from 'url-join';

import { NavItem } from './common';
import { Kata, kataPaths } from './katas';
import { CodeSample, codeSamplePaths } from './code-samples';

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
              {codeSamplePaths.samples.map((samplePath, idx) => {
                const {
                  '1': ext,
                  index: extIndex,
                } = samplePath.match(/\.([0-9a-z]+)$/i) || {};
                const safeSamplePath = ext ?
                  urlJoin(samplePath.slice(0, extIndex), `?ext=${ext}`) :
                  samplePath;
                return (
                  <NavItem key={idx} to={urlJoin('/', codeSamplePaths.root, safeSamplePath)}>{samplePath}</NavItem>
                );
              })}
            </ul>
          </nav>

          <div className={`${cnRoot}--content`}>
            <Switch>
              <Route path={urlJoin('/', kataPaths.root, ':kataPath+')} component={Kata} />
              <Route path={urlJoin('/', codeSamplePaths.root, ':codeSamplePath+')} component={CodeSample} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
