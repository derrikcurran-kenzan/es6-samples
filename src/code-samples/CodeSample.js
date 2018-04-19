import React from 'react';
import PropTypes from 'prop-types';
import urlJoin from 'url-join';

import { CodeBlock } from '../common';

import codeSamplePaths from './codeSamplePaths.json';

const propTypes = {
  // Path relative to public code samples root (e.g. /code-samples).
  // If not provided, props.match.params.codeSamplePath will be used.
  path: PropTypes.string,
};

const defaultProps = {

};

const CodeSample = props => {
  const cnRoot = 'CodeSample';
  let sourceUri = '/' + urlJoin(codeSamplePaths.root, props.path || props.match.params.codeSamplePath);
  if (props.location.search) {
    const ext = new URLSearchParams(props.location.search).get('ext');
    if (ext) {
      sourceUri += `.${ext}`;
    }
  }
  return (
    <div className={cnRoot}>
      <h3>{sourceUri}</h3>
      <div className={`${cnRoot}--source`}>
        <CodeBlock sourceUri={sourceUri} />
      </div>
    </div>
  );
};

export default Object.assign(CodeSample, { propTypes, defaultProps });