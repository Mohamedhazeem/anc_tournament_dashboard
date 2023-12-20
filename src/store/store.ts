import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tournamentSlice from "./slice/tournamentSlice";


const rootReducer = combineReducers({tournamentSlice});
const store= configureStore({reducer: rootReducer});

export default store;

export type RootState = ReturnType<typeof store.getState>