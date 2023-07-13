import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios'
import { client, authClient } from '../../services/client.js';
import {setToken} from '../../services/token.js'

export const fetchAuth = createAsyncThunk(
    'authorization/fetchAuth',
    async function (payload, {rejectWithValue}) {
        try {
            const { data } = await client.post(`/auth/sign_in`, payload);
            if (data.status !== 'OK') 
                throw new Error('Server Error!')
            setToken(data.data.token);
            // console.log(payload);
            // console.log(data);
            // window.localStorage.setItem('token', data.data.token)
            return data
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

const authSlice = createSlice({
    name: 'authorization',
    initialState: {
        user: [],
        status: null,
        error: null
    },
    reducers: {
        authReducer(state, action){},
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.user = action.payload.data.user;
            })
            .addCase(fetchAuth.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
        // [axiosAuth.fulfilled]: (state, action) => {
        //     state.status = 'resolved';
        //     state.auth = action.payload;
        // },
        // [axiosAuth.reject]: (state) => {
        //     state.status = 'loading';
        //     state.error = null;
        // }
    }
})

export const { authReducer } = authSlice;

export default authSlice.reducer;
