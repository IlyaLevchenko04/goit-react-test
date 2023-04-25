import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, loadMoreUsers } from 'redux/followingSlice/operations';
import { CardList } from './CardList';

export const App = () => {
  const dispatch = useDispatch();
  const page = useSelector(state => state.following.page);
  useEffect(() => {
    if (page > 1) {
      dispatch(loadMoreUsers(page));
      return;
    }
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  return <CardList />;
};
