import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
};

const defaultProps = {

};

const NavItem = props => {
  const cnRoot = 'NavItem';

  const {
    to,
    children,
    location,
  } = props;

  return (
    <li className={classNames(cnRoot, { active: location.pathname.startsWith(to) })}>
      <Link to={to}>{children || to}</Link>
    </li>
  );
};

export default withRouter(Object.assign(NavItem, { propTypes, defaultProps }));