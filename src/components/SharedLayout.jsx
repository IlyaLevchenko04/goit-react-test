import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import {
  filterAll,
  filterFollowing,
  filterUnFollowing,
} from 'redux/followingSlice/followingSlice';
import styled from 'styled-components';

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
  const dispatch = useDispatch();

  const handleFilter = e => {
    const button = e.currentTarget;
    if (button.name === 'all') {
      console.log('all');
      dispatch(filterAll());
      return;
    }

    if (button.name === 'following') {
      console.log('following');
      dispatch(filterFollowing());
      return;
    }

    if (button.name === 'unFollowing') {
      console.log('unfollowing');
      dispatch(filterUnFollowing());
      return;
    }
  };
  return (
    <>
      <nav className="nav">
        <StyledNavLink to={'/'}>Home</StyledNavLink>
        <StyledNavLink to={'/tweets'}>Tweets</StyledNavLink>
      </nav>
      <div className="dropdown">
        <button className="dropbtn">Dropdown</button>
        <div className="dropdown-content">
          <button type="button" name="all" onClick={handleFilter}>
            All
          </button>
          <button type="button" name="following" onClick={handleFilter}>
            Following
          </button>
          <button type="button" name="unFollowing" onClick={handleFilter}>
            Unfollowing
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};
