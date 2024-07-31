import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import axiosInstance from '../../api/axiosInstance'

export const fetchCurrentUser = createAsyncThunk('currentUser/fetchCurrentUser', async () => {
    const access = localStorage.getItem('access') || null
    const { user_id } = jwtDecode(access);
    const response = await axiosInstance.get(`http://localhost:8000/auth/api/user/${user_id}/`)
    return response.data;
})

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {
        user: {},
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.status = 'successeded';
                state.user = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
    }
})

export default currentUserSlice.reducer