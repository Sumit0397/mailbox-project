import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sentboxItems: [],
    sentMessageOpen: JSON.parse(localStorage.getItem('sentMessage open'))
};

const sentboxSlice = createSlice({
    name: "sentbox",
    initialState,
    reducers: {
        addItems(state, action) {
            state.sentboxItems = action.payload
        },
        addMessageOpen(state, action) {
            state.sentMessageOpen = action.payload[1];
            const msgOpen = JSON.stringify(action.payload[1]);
            localStorage.setItem("sentMessage open", msgOpen);
        },
        removeItem(state, action) {
            const filterItem = state.sentboxItems.filter((element) => element[0] !== action.payload[0]);
            state.sentboxItems = filterItem;
        }
    }
})

export const sentboxActions = sentboxSlice.actions;

export const sentboxItemFill = (email) => {
    return async(dispatch) => {
        try {
            const userEmail = email.replace(/[.@]/g,"");
            const resSentbox = await fetch(`https://mail-box-myreact-default-rtdb.firebaseio.com/${userEmail}/sentEmails.json`);

            const data = await resSentbox.json();

            if(resSentbox.ok){
                dispatch(sentboxActions.addItems(Object.entries(data)))
            }
        } catch (error) {
            alert(error)
        }
    }
}

export default sentboxSlice.reducer;