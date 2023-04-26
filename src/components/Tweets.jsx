import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CardList } from './CardList';
import { useEffect } from 'react';
import { fetchUsers, loadMoreUsers } from 'redux/followingSlice/operations';
import {
  selectFilter,
  selectIsLoadMore,
  selectIsLoading,
  selectPage,
} from 'redux/followingSlice/selectors';
import { refreshPage } from 'redux/followingSlice/followingSlice';

export const Tweets = () => {
  const isLoadMore = useSelector(selectIsLoadMore);
  const isLoading = useSelector(selectIsLoading);
  const page = useSelector(selectPage);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleLoadMoreClick = () => {
    dispatch(loadMoreUsers(page));

    return;
  };

  return (
    <>
      <Link to={'/'}>
        <button
          onClick={() => {
            dispatch(refreshPage());
          }}
        >
          Back
        </button>
      </Link>
      <CardList />
      {isLoading && <span className="loader">Fetching in progress</span>}
      {isLoadMore && filter === 'all' && (
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
