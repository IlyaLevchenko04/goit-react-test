import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  filterAll,
  filterFollowing,
  filterUnFollowing,
} from 'redux/followingSlice/followingSlice';

export const Dropdown = () => {
  const [state, setState] = useState('All');
  const dispatch = useDispatch();

  const handleFilter = e => {
    const button = e.currentTarget;

    if (button.name === 'all') {
      setState('All');
      dispatch(filterAll());
      return;
    }

    if (button.name === 'following') {
      setState('Following');
      dispatch(filterFollowing());
      return;
    }

    if (button.name === 'unFollowing') {
      setState('Follow');
      dispatch(filterUnFollowing());
      return;
    }
  };
  return (
    <div className="dropdown">
      <button className="dropbtn">{state}</button>
      <div className="dropdown-content">
        <button
          type="button"
          name="all"
          onClick={handleFilter}
          className="dropdownBtn"
        >
          All
        </button>
        <button
          type="button"
          name="following"
          onClick={handleFilter}
          className="dropdownBtn"
        >
          Following
        </button>
        <button
          type="button"
          name="unFollowing"
          onClick={handleFilter}
          className="dropdownBtn"
        >
          Follow
        </button>
      </div>
    </div>
  );
};
