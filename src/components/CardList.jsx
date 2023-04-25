import { useDispatch, useSelector } from 'react-redux';
import longStick from '../images/longStick.svg';
import Ellipse from '../images/Ellipse.svg';
import Logo from '../images/Logo.svg';
import message from '../images/message1.svg';
import { loadMore } from 'redux/followingSlice/followingSlice';
import { follow, unFollow } from 'redux/followingSlice/operations';
import { useEffect } from 'react';

export const CardList = () => {
  const users = useSelector(state => state.following.users);
  const followingIds = useSelector(state => state.following.followingIds);
  const isLoadMore = useSelector(state => state.following.isLoadMore);
  const isLoading = useSelector(state => state.following.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {}, [followingIds, users]);

  const handleClick = e => {
    const id = e.currentTarget.closest('li').id;

    if (followingIds.includes(id)) {
      // dispatch(removeId(id));
      dispatch(unFollow(id));
      return;
    }

    dispatch(follow(id));
    // dispatch(addId(id));
  };

  const handleLoadMoreClick = () => {
    dispatch(loadMore());
  };

  return (
    <>
      <ul className="card-list">
        {users.map(({ tweets, avatar, followers, id, following }) => {
          if (following) {
            followers = Number(followers) + 1;
          }
          // 89000 => 89,000
          const uiNumbers = value => {
            return value.toLocaleString('en-EN');
          };

          return (
            <li key={id} className="list-item" id={id}>
              <img src={message} alt="" className="message" />
              <img src={longStick} alt="" className="long-stick"></img>
              <img src={Ellipse} alt="" className="elipse"></img>
              <img src={Logo} alt="logo" className="logo" />

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
      {isLoading && <span className="loader">Fetching in progress</span>}
      {isLoadMore && (
        <button
          type="button"
          className="load-more-btn"
          onClick={handleLoadMoreClick}
        >
          Load more
        </button>
      )}
    </>
  );
};
