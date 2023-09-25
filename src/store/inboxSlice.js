import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inboxItems: [],
    messageOpen: JSON.parse(localStorage.getItem('message open'))
}

const inboxSlice = createSlice({
    name: "inbox",
    initialState,
    reducers: {
        addItems(state, action) {
            state.inboxItems = action.payload;
        },
        addMessageOpen(state, action) {
            state.messageOpen = action.payload[1];
            const msgopen = JSON.stringify(action.payload[1]);
            localStorage.setItem('message open', msgopen);
        },
        removeItem(state,action) {
          const filterItem = state.inboxItems.filter((element) => element[0] !== action.payload[0]);
          state.inboxItems = filterItem;
        }
    }
})

export const inboxActions = inboxSlice.actions;

export const inboxItemFill = (email) => {
    return async (dispatch) => {
      try {
        const userEmail = email.replace(/[.@]/g, "");
        const resInbox = await fetch(
          `https://mail-box-myreact-default-rtdb.firebaseio.com/${userEmail}/recievedEmails.json`
        );
        const data = await resInbox.json();
        console.log(data)
  
        if (resInbox.ok) {
          dispatch(inboxActions.addItems(Object.entries(data)));
          // console.log("yes");
        }
      } catch (error) {
        alert(error);
      }
    };
  };

export default inboxSlice;