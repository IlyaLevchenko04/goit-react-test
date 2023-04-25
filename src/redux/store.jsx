import { followingReducer } from './followingSlice/followingSlice';

const { configureStore } = require('@reduxjs/toolkit');

export const store = configureStore({
  reducer: {
    following: followingReducer,
  },
});
