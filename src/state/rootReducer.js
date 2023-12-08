import { combineReducers } from "redux";
import { songReducer } from "./reducers/songReducer";


export const rootReducer = combineReducers({
    songState: songReducer
})