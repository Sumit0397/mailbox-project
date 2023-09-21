import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tokenId : ''
}

const AuthSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login(state, action) {
            state.tokenId = action.payload.tokenId
        }
    }
})

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;