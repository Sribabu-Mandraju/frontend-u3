import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRequests = createAsyncThunk("/fetch/requests", async (token) => {
  try {
    const res = await axios.get(
      "https://backend-u3.onrender.com/admin/all-requests",
      {
        headers: {
          Authorization: `${token}`
        }
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.error || error.message);
  }
});

const requestSlice = createSlice({
  name: "requests",
  initialState: { error: null, data: null, state: "idle", current: null },
  reducers: {
    setBack: (state, action) => {
      state.state = "loading";
      state.data = null;
      state.error = null;
    },
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    clearCurrent: (state, action) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRequests.pending, (state, action) => {
      state.state = "loading";
    });
    builder.addCase(fetchRequests.rejected, (state, action) => {
      state.state = "loaded";
      state.error = action.error.message;
    });
    builder.addCase(fetchRequests.fulfilled, (state, action) => {
      state.state = "loaded";
      state.error = null;
      state.data = action.payload;
    });
  },
});

export default requestSlice;
export const jobActions = requestSlice.actions;
