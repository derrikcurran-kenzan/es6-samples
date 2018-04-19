import React, { Component } from 'react';
import urlJoin from 'url-join';

import Kata from './Kata';

import kataPaths from './paths.json';

import './Katas.css';

class Katas extends Component {
  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      selectedKataPath: '',
    };
  }

  handleKataSelected(selectedKataPath) {
    this.setState({ selectedKataPath });
  }

  render() {
    const cnRoot = 'Katas';

    const {
      selectedKataPath,
    } = this.state;

    return (
      <div className={cnRoot}>
        <div className={`${cnRoot}--nav`}>
          <h2>Katas</h2>
          <ul>
            {kataPaths.modules.map((kataPath, idx) => (
              <li key={idx} className={selectedKataPath === kataPath ? 'active' : null}>
                <a href onClick={this.handleKataSelected.bind(this, kataPath)}>{kataPath}</a>
              </li>
            ))}
          </ul>
        </div>

        {selectedKataPath && (
          <div className={`${cnRoot}--viewer`}>
            <h3>{selectedKataPath}</h3>
            <Kata path={urlJoin(kataPaths.root, selectedKataPath)} />
          </div>
        )}
      </div>
    );
  }
}

export default Katas;