import { NavLink, Outlet, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import { Dropdown } from './Dropdown';

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.22;
  color: #373737;

  &.active {
    color: orange;
  }
`;

export const SharedLayout = () => {
  const location = useLocation();

  return (
    <>
      <div className="nav-container">
        <nav className="nav">
          <StyledNavLink to={'/'}>Home</StyledNavLink>
          <StyledNavLink to={'/tweets'}>Tweets</StyledNavLink>
        </nav>
        {location.pathname === '/tweets' && <Dropdown />}
      </div>

      <Outlet />
    </>
  );
};
