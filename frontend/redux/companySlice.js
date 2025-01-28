import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany:null,
    companies:[],
    searchCompany:""
  },
  reducers: {
    setCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setAllCompany:(state,action)=>{
      state.companies = action.payload
    },
    setSearchCompany:(state,action)=>{
      state.searchCompany = action.payload
    }
  },
});

export const {setCompany,setAllCompany,setSearchCompany} = companySlice.actions;
export default companySlice.reducer