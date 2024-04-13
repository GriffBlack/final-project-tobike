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
                {throw new Error('Server Error!')}
            setToken(data.data.token);
            return data
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const fetchRegistration = createAsyncThunk(`auth/sign_up`, async (payload) => {
    const { data } = await client.post(`/auth/sign_up`, payload);
    return data;
});

export const fetchAccec = createAsyncThunk(`auth`, async () => {
    const { data } = await authClient().get(`/auth`);
    return data;
});

const resFulfilled = (state, action) => {
    state.status = 'resolved';
    state.user = action.payload.data.user;
    state.error = null;
};

const resRejected = (state, action) => {
    state.user = null;
    state.status = 'rejected';
    state.error = action.error.message;
};
const resPending = (state) => {
    state.user = null;
    state.status = 'pending';
    state.error = null;
};

const authSlice = createSlice({
    name: 'authorization',
    initialState: {
        user: [],
        status: null,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.status = null;
            state.error = null;
            localStorage.removeItem('auth-token');
    },
        authUser: (state, action) => {
            state.user = action.data.data.user;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchAccec.pending, resPending)
            .addCase(fetchRegistration.pending, resPending)

            .addCase(fetchAuth.fulfilled, resFulfilled)
            .addCase(fetchAccec.fulfilled, resFulfilled)
            .addCase(fetchRegistration.fulfilled, resFulfilled)

            .addCase(fetchAuth.rejected, resRejected)
            .addCase(fetchAccec.rejected, resRejected)
            .addCase(fetchRegistration.rejected, resRejected)
    }
})

export const { authReducer, logout } = authSlice.actions;

export default authSlice.reducer;
