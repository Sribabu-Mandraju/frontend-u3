import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchJobs = createAsyncThunk("/fetch/jobs", async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URL}/admin/jobs/`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.data.jobListing;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.error || error.message);
  }
});

const jobSlice = createSlice({
  name: "job",
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
    builder.addCase(fetchJobs.pending, (state, action) => {
      state.state = "loading";
    });
    builder.addCase(fetchJobs.rejected, (state, action) => {
      state.state = "loaded";
      state.error = action.error.message;
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.state = "loaded";
      state.error = null;
      state.data = action.payload;
    });
  },
});

export default jobSlice;
export const jobActions = jobSlice.actions;
