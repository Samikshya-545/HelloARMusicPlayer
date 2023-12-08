// src/redux/actions/index.js

import { createAction } from '@reduxjs/toolkit';

export const setCurrentSongIndexAction = (currIndex) => {
    return {
        type: 'SET_CURRENT_SONG_INDEX',
        payload: currIndex
    }
}
