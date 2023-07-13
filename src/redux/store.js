import { configureStore } from "@reduxjs/toolkit";
// import  {userReducer}  from './slices/userSlise';
import authReducer from './slices/authSlice'


const store = configureStore({
    reducer: {
        // user: userReducer,
        user: authReducer,
    }
});

export default store;