import { useDispatch } from 'react-redux';
import {
  filterAll,
  filterFollowing,
  filterUnFollowing,
} from 'redux/followingSlice/followingSlice';

export const Dropdown = () => {
  const dispatch = useDispatch();

  const handleFilter = e => {
    const button = e.currentTarget;

    if (button.name === 'all') {
      dispatch(filterAll());
      return;
    }

    if (button.name === 'following') {
      dispatch(filterFollowing());
      return;
    }

    if (button.name === 'unFollowing') {
      dispatch(filterUnFollowing());
      return;
    }
  };
  return (
    <div className="dropdown">
      <button className="dropbtn">Dropdown</button>
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
