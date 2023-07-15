import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client, authClient } from '../../service/client';

export const fetchRegistration = createAsyncThunk(`auth/sign_up`, async (payload) => {
    const { data } = await client.post(`/auth/sign_up`, payload);
    return data;
});

export const fetchLogin = createAsyncThunk(`$auth/sign_in`, async (payload) => {
    const { data } = await client.post(`/auth/sign_in`, payload);
    return data;
});

export const fetchMe = createAsyncThunk(`auth`, async () => {
    const { data } = await authClient().get(`/auth`);
    return data;
});

const initialState = {
    data: null,
    status: 'idle',
    error: null,
};

const resFulfilled = (state, action) => {
    state.status = 'fulfilled';
    state.data = action.payload.data.user;
    state.error = null;
};

const resRejected = (state, action) => {
    state.data = null;
    state.status = 'rejected';
    state.error = action.error.message;
};
const resPending = (state) => {
    state.data = null;
    state.status = 'pending';
    state.error = null;
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
        state.data = null;
        state.status = null;
        state.error = null;
        localStorage.removeItem('auth-token');
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchMe.pending, resPending)
            .addCase(fetchRegistration.pending, resPending)

            .addCase(fetchLogin.fulfilled, resFulfilled)
            .addCase(fetchMe.fulfilled, resFulfilled)
            .addCase(fetchRegistration.fulfilled, resFulfilled)

            .addCase(fetchLogin.rejected, resRejected)
            .addCase(fetchMe.rejected, resRejected)
            .addCase(fetchRegistration.rejected, resRejected)
    }
});

export const userReducer = userSlice.reducer;

export const { logout } = userSlice.actions;
