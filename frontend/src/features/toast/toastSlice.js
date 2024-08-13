import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    state: false,
    type: null,
    title: null,
    description: null,
    displayTime: 3500,
    timeOutId: undefined,
}

const toastSlice = createSlice({
    name: "tost",
    initialState,
    reducers: {
        notify: (state, action) => {
            const { type, title, description } = action.payload;
            state.type = type;
            state.title = title;
            state.description = description;
            state.state = true;
        },
        closeNotify: (state) => {
            state.state = false;
        }
    }
})

export const { notify, closeNotify } = toastSlice.actions;
export default toastSlice.reducer;
