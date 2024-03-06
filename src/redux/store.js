import { configureStore } from '@reduxjs/toolkit';
import postReducer from './reducers/postReducer.js';
import userReducer from './reducers/userReducer.js';

export default configureStore({
    reducer: {
        posts: postReducer,
        user: userReducer,
    },
})