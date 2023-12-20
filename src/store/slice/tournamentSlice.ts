import { Game } from "../../utils/propsType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TournamentState {
    data: Game[];
  }
  const initialState: TournamentState = {
    data: [],
  }
  const tournamentSlice = createSlice({
    name: 'tournament',
    initialState,
    reducers: {
        setTournaments: (state, action: PayloadAction<Game[]>) => {
        state.data = action.payload;        
      },
    },
  });

  export const {setTournaments} = tournamentSlice.actions;
  export default tournamentSlice.reducer;