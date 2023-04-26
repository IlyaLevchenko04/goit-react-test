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
import { useEffect } from 'react';

export const CardList = () => {
  const users = useSelector(selectUsers);
  const followingIds = useSelector(selectFollowingIds);
  const filter = useSelector(selectFilter);
  const allUsers = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

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

  const usersFollowing = allUsers.filter(({ following }) => following === true);
  const usersUnfollowing = allUsers.filter(
    ({ following }) => following === false
  );
  return (
    <ul className="card-list">
      {filter === 'all' &&
        users.map(({ tweets, avatar, followers, id }) => {
          // 89000 => 89,000
          const uiNumbers = value => {
            return value.toLocaleString('en-EN');
          };

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
        })}

      {filter === 'following' &&
        usersFollowing.map(({ tweets, avatar, followers, id }) => {
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
        })}

      {filter === 'unFollowing' &&
        usersUnfollowing.map(({ tweets, avatar, followers, id }) => {
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
        })}
    </ul>
  );
};
