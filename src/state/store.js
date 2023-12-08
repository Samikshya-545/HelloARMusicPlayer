// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import { songReducer } from './reducers/songReducer';
import { rootReducer } from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;   