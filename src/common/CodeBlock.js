import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/styles/hljs';

class CodeBlock extends Component {
  static propTypes = {
    ...SyntaxHighlighter.propTypes,
    sourceUri: PropTypes.string, // URI to load source file from.
  };

  static defaultProps = {
    language: 'javascript',
  };

  constructor(props) {
    super(props);
    this.state = {
      source: props.children,
    };
  }

  componentDidMount() {
    return this.loadSource();
  }

  componentDidUpdate(prevProps) {
    if (this.props.sourceUri !== prevProps.sourceUri) {
      return this.loadSource();
    }
  }

  async loadSource() {
    this.setState({
      source: await (await fetch(this.props.sourceUri)).text(),
    });
  }

  render() {
    const {
      children,
      sourceUri,
      ...otherProps,
    } = this.props;
    const source = this.state.source || children;
    return (
      <div className='CodeBlock'>
        {source && (
          <SyntaxHighlighter {...otherProps} style={darcula}>
            {source}
          </SyntaxHighlighter>
        )}
      </div>
    );
  }
}

export default CodeBlock;