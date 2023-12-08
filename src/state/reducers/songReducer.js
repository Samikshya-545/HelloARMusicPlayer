// src/redux/reducers/index.js

import { createReducer } from '@reduxjs/toolkit';
import { setCurrentSongIndexAction } from '../actions/songAction';

const initialState = {
  currentSongIndex: 0,
};

export const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CURRENT_SONG_INDEX":
            console.log(action);
            return {
                ...initialState,
                currentSongIndex: action.payload
            }
        default:
            return state;
    }
};
