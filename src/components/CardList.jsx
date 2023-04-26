import { useDispatch, useSelector } from 'react-redux';
import { Photos } from './Photos';
import {
  fetchAllUsers,
  follow,
  unFollow,
} from 'redux/followingSlice/operations';
import {
  selectAllUsers,
  selectFilter,
  selectFollowingIds,
  selectUsers,
} from 'redux/followingSlice/selectors';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { setFilter } from 'redux/followingSlice/followingSlice';

export const CardList = () => {
  const users = useSelector(selectUsers);
  const followingIds = useSelector(selectFollowingIds);
  const filter = useSelector(selectFilter);
  const allUsers = useSelector(selectAllUsers);
  const filterRef = useRef('');
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());

    setSearchParams({ filter: filter });

    filterRef.current = filter;

    dispatch(setFilter(filterRef.current));
  }, [dispatch, setSearchParams, filter]);

  const handleClick = e => {
    const id = e.currentTarget.closest('li').id;

    if (followingIds.includes(id)) {
      dispatch(unFollow(id));
      return;
    }

    dispatch(follow(id));
  };

  // 89000 => 89,000
  const uiNumbers = value => {
    return value.toLocaleString('en-EN');
  };

  const getVisibleTweets = (tweets, filterType) => {
    if (filterType === 'Following') {
      const followingTweets = tweets.filter(
        ({ following }) => following === true
      );

      return followingTweets;
    }

    if (filterType === 'Follow') {
      const followTweets = tweets.filter(
        ({ following }) => following === false
      );

      return followTweets;
    }

    return users;
  };

  const visibleTweets = getVisibleTweets(allUsers, filter);

  return (
    <ul className="card-list">
      {visibleTweets.length > 0 ? (
        visibleTweets.map(({ tweets, avatar, followers, id }) => {
          return (
            <li key={id} className="list-item" id={id}>
              <Photos />

              <div className="card-info-wrap">
                <img src={avatar} alt="user avatar" className="profile-photo" />
                <ul className="text-wrap">
                  <li className="card-text">
                    {uiNumbers(followers)} Followers
                  </li>
                  <li className="card-text">{uiNumbers(tweets)} Tweets </li>
                </ul>
                <button
                  type="button"
                  onClick={handleClick}
                  className={
                    followingIds.includes(id)
                      ? 'following-button'
                      : 'follow-button'
                  }
                >
                  {followingIds.includes(id) ? 'Following' : 'Follow'}
                </button>
              </div>
            </li>
          );
        })
      ) : (
        <span
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
            color: '#010101',
          }}
        >
          No tweets
        </span>
      )}
    </ul>
  );
};
