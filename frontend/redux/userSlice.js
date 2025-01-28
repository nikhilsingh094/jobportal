import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        loading:false
    },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload
        },
        setLoading:(state,action)=>{
            state.loading = action.payload
        }
    }
})

export const {setUser,setLoading} = userSlice.actions;
export default userSlice.reducer;
