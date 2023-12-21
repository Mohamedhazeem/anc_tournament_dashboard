import { AddPlayerAction, Game, RemovePlayerAction, UpdatePlayerAction } from "../../utils/propsType";
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
        const words = name.split(" ").map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });
        const capitalizedName = words.join(" ");    
        state.games[gameId].teams[teamIndex].players.unshift({name:capitalizedName,age});
      },
      removePlayer: (state, action: PayloadAction<RemovePlayerAction>) => {
        const { gameId, teamIndex, playerIndex } = action.payload;
        state.games[gameId].teams[teamIndex].players.splice(playerIndex, 1);
    },
      
    },
  });

  export const {setTournaments,updatePlayer,addPlayer, removePlayer} = tournamentSlice.actions;
  export default tournamentSlice.reducer;