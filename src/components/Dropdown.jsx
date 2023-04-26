import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setFilter } from 'redux/followingSlice/followingSlice';

export const Dropdown = () => {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState('All');
  const dispatch = useDispatch();

  useEffect(() => {
    setState(searchParams.get('filter'));
  }, [searchParams]);
  const handleFilter = e => {
    const button = e.currentTarget;

    if (button.name === 'All') {
      setState('All');
      dispatch(setFilter('All'));
      return;
    }

    if (button.name === 'Following') {
      setState('Following');
      dispatch(setFilter('Following'));
      return;
    }

    if (button.name === 'Follow') {
      setState('Follow');
      dispatch(setFilter('Follow'));
      return;
    }
  };
  return (
    <div className="dropdown">
      <button className="dropbtn">{state}</button>
      <div className="dropdown-content">
        <button
          type="button"
          name="All"
          onClick={handleFilter}
          className="dropdownBtn"
        >
          All
        </button>
        <button
          type="button"
          name="Following"
          onClick={handleFilter}
          className="dropdownBtn"
        >
          Following
        </button>
        <button
          type="button"
          name="Follow"
          onClick={handleFilter}
          className="dropdownBtn"
        >
          Follow
        </button>
      </div>
    </div>
  );
};
