import React, { Component } from 'react';
import PropTypes from 'prop-types';
import urlJoin from 'url-join';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/styles/hljs';

class Kata extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired, // Relative to public root.
    testSourceFilename: PropTypes.string, // File containing source code for successful tests.
    resultsImageFilename: PropTypes.string, // Screenshot of results.
  };

  static defaultProps = {
    testSourceFilename: 'tests.js',
    resultsImageFilename: 'results.png',
  };

  constructor(props) {
    super(props);
    this.state = {
      testSource: '',
    };
  }

  async componentDidMount() {
    this.setState({
      testSource: await (await fetch(this.getSourcePaths().tests)).text(),
    });
  }

  getSourcePaths() {
    const {
      path,
      testSourceFilename,
      resultsImageFilename,
    } = this.props;

    return {
      tests: urlJoin(path, testSourceFilename),
      results: urlJoin(path, resultsImageFilename),
    };
  }

  render() {
    const cnRoot = 'Kata';
    return (
      <div className={cnRoot}>
        <div className={`${cnRoot}--results`}>
          <img src={this.getSourcePaths().results} alt='Kata Results'/>
        </div>
        <div className={`${cnRoot}--tests`}>
          <SyntaxHighlighter language='javascript' style={darcula}>{this.state.testSource}</SyntaxHighlighter>
        </div>
      </div>
    );
  }
}

export default Kata;