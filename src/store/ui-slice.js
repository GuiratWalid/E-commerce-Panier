import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        notification: {
            open: false,
            message: '',
            type: '',
        }
    },
    reducers: {
        showNotification(state, action) {
            state.notification = {
                message: action.payload.message,
                type: action.payload.type,
                open: action.payload.open,
            }
        }
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;