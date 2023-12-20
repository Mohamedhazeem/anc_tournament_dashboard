import { AddPlayerAction, Game, UpdatePlayerAction } from "../../utils/propsType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TournamentState {
    games: Game[];
  }
  const initialState: TournamentState = {
    games: [],
  }
  const tournamentSlice = createSlice({
    name: 'tournament',
    initialState,
    reducers: {
        setTournaments: (state, action: PayloadAction<Game[]>) => {
        state.games = action.payload;        
      },
      updatePlayer: (state, action: PayloadAction<UpdatePlayerAction>) => {
        const { gameId, teamIndex, playerIndex, name, age } = action.payload;
        state.games[gameId].teams[teamIndex].players[playerIndex] = {name,age};
      },
      addPlayer: (state, action: PayloadAction<AddPlayerAction>) => {
        const { gameId, teamIndex, name, age } = action.payload;
        state.games[gameId].teams[teamIndex].players.unshift({name,age});
      }
    },
  });

  export const {setTournaments,updatePlayer,addPlayer} = tournamentSlice.actions;
  export default tournamentSlice.reducer;