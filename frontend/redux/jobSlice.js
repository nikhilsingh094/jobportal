import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs:[],
    singleJob:null,
    searchJobs:"",
    allAppliedJobs:[],
    searchBrowseJob:"",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setJobSearch: (state, action) => {
      state.searchJobs = action.payload;
    },
    setAllAppliedJobs:(state,action)=>{
      state.allAppliedJobs = action.payload
    },
    setSearchBrowseJobs:(state,action)=>{
      state.searchBrowseJob = action.payload
    }
  },
});

export const {setAllJobs,setSingleJob,setJobSearch,setAllAdminJobs,setAllAppliedJobs,setSearchBrowseJobs} = jobSlice.actions;
export default jobSlice.reducer