import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllUsers,
  fetchUsers,
  follow,
  loadMoreUsers,
  unFollow,
} from './operations';

const initialState = {
  followingIds: [],
  users: [],
  page: 1,
  isLoadMore: true,
  isLoading: false,
  filter: 'all',
  allUsers: [],
};
const followingSlice = createSlice({
  name: 'following',
  initialState,
  reducers: {
    refreshPage(state, action) {
      state.page = 1;
      state.isLoadMore = true;
    },
    filterFollowing(state, action) {
      state.filter = 'following';
    },
    filterUnFollowing(state, action) {
      state.filter = 'unFollowing';
    },
    filterAll(state, action) {
      state.filter = 'all';
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
        state.page = 2;
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
        state.page += 1;
        action.payload.map(user => {
          if (user.following) {
            if (state.followingIds.includes(user.id)) {
              return state.followingIds;
            }
            return state.followingIds.push(user.id);
          }
          return state.followingIds;
        });
      })
      .addCase(loadMoreUsers.rejected, (state, action) => {
        state.isLoadMore = false;
        state.isLoading = false;
      })
      .addCase(follow.pending, (state, action) => state)
      .addCase(follow.fulfilled, (state, action) => {
        state.followingIds.push(action.payload.id);
        state.users = state.users.map(user => {
          if (user.id === action.payload.data.id) {
            return (user = action.payload.data);
          }
          return user;
        });
      })
      .addCase(follow.rejected, (state, action) => state)
      .addCase(unFollow.pending, (state, action) => state)
      .addCase(unFollow.fulfilled, (state, action) => {
        state.followingIds = state.followingIds.filter(
          id => id !== action.payload.id
        );
        state.users = state.users.map(user => {
          if (user.id === action.payload.data.id) {
            return (user = action.payload.data);
          }
          return user;
        });
      })
      .addCase(unFollow.rejected, (state, action) => state)
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.isLoading = false;
        action.payload.map(user => {
          if (user.following) {
            if (state.followingIds.includes(user.id)) {
              return state.followingIds;
            }

            return state.followingIds.push(user.id);
          }
          return state.followingIds;
        });
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
      }),
});

export const { refreshPage, filterFollowing, filterUnFollowing, filterAll } =
  followingSlice.actions;
export const followingReducer = followingSlice.reducer;
