import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://64452b4d914c816083c7b1d2.mockapi.io/';

export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/user/?limit=3&page=1`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadMoreUsers = createAsyncThunk(
  'user/loadMore',
  async (page, thunkAPI) => {
    try {
      const response = await axios.get(`/user/?limit=3&page=${page}`);
      if (response.data.length === 0) {
        return thunkAPI.rejectWithValue();
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const follow = createAsyncThunk(
  'following/follow',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/user/${id}`);

      response.data.followers += 1;
      response.data.following = true;
      const postData = response.data;
      console.log(postData);
      await axios.put(`/user/${id}`, postData);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const unFollow = createAsyncThunk(
  'following/unFollow',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/user/${id}`);

      response.data.followers -= 1;
      response.data.following = false;
      const postData = response.data;

      console.log(postData);
      await axios.put(`/user/${id}`, postData);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
