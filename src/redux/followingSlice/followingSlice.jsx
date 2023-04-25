import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, follow, loadMoreUsers, unFollow } from './operations';

const initialState = {
  followingIds: [],
  users: [],
  page: 1,
  isLoadMore: true,
  isLoading: false,
};
const followingSlice = createSlice({
  name: 'following',
  initialState,
  reducers: {
    addId(state, action) {
      state.followingIds.push(action.payload);
    },
    removeId(state, action) {
      state.followingIds = state.followingIds.filter(
        id => id !== action.payload
      );
    },
    loadMore(state, action) {
      state.page += 1;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        action.payload.map(user => {
          if (user.following) {
            return state.followingIds.push(user.id);
          }
          return state.followingIds;
        });
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(loadMoreUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadMoreUsers.fulfilled, (state, action) => {
        state.users = [...state.users, ...action.payload];
        state.isLoading = false;
        action.payload.map(user => {
          if (user.following) {
            return state.followingIds.push(user.id);
          }
          return null;
        });
      })
      .addCase(loadMoreUsers.rejected, (state, action) => {
        state.isLoadMore = false;
        state.isLoading = false;
      })
      .addCase(follow.pending, (state, action) => state)
      .addCase(follow.fulfilled, (state, action) => {
        state.followingIds.push(action.payload);
      })
      .addCase(follow.rejected, (state, action) => state)
      .addCase(unFollow.pending, (state, action) => state)
      .addCase(unFollow.fulfilled, (state, action) => {
        state.followingIds = state.followingIds.filter(
          id => id !== action.payload
        );
      })
      .addCase(unFollow.rejected, (state, action) => state),
});

export const { addId, removeId, loadMore, isLoadMore } = followingSlice.actions;
export const followingReducer = followingSlice.reducer;
