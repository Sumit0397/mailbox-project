import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tokenId : localStorage.getItem('user'),
    email: localStorage.getItem("userEmail")
}

const AuthSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login(state, action) {
            state.tokenId = action.payload.tokenId;
            state.email = action.payload.email;
            localStorage.setItem('user' , action.payload.tokenId);
            localStorage.setItem("userEmail" , action.payload.email);
        }
    }
})

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;