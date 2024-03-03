import { configureStore } from '@reduxjs/toolkit';
import postReducer from './reducers/postReducer.js';

export default configureStore({
    reducer: {
        posts: postReducer,
    },
})