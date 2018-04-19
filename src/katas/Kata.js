import React, { Component } from 'react';
import PropTypes from 'prop-types';
import urlJoin from 'url-join';

import { CodeBlock } from '../common';

import kataPaths from './kataPaths.json';

class Kata extends Component {
  static propTypes = {
    // Path relative to public katas root (e.g. /katas). If not provided, props.match.params.kataPath will be used.
    path: PropTypes.string,

    testSourceFilename: PropTypes.string, // File containing source code for successful tests.
    resultsImageFilename: PropTypes.string, // Screenshot of results.
  };

  static defaultProps = {
    testSourceFilename: 'tests.js',
    resultsImageFilename: 'results.png',
  };

  getSourcePaths() {
    const {
      testSourceFilename,
      resultsImageFilename,
    } = this.props;

    const modulePath = '/' + urlJoin(kataPaths.root, this.props.path || this.props.match.params.kataPath);

    return {
      module: modulePath,
      tests: urlJoin(modulePath, testSourceFilename),
      results: urlJoin(modulePath, resultsImageFilename),
    };
  }

  render() {
    const cnRoot = 'Kata';
    const sourcePaths = this.getSourcePaths();
    return (
      <div className={cnRoot}>
        <h3>{sourcePaths.module}</h3>
        <div className={`${cnRoot}--results`}>
          <img src={sourcePaths.results} alt='Kata Results'/>
        </div>
        <div className={`${cnRoot}--tests`}>
          <CodeBlock sourceUri={sourcePaths.tests} />
        </div>
      </div>
    );
  }
}

export default Kata;