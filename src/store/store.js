import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import inboxReducer from "./inboxSlice";
import sentboxReducer from "./sentboxSlice";

const store = configureStore({
    reducer: {
        auth: authReducer, inbox: inboxReducer, sentbox: sentboxReducer
    }
})

export default store;