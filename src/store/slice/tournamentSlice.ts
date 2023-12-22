import { AddPlayerAction, Game, LastSelectedPlayerAction, RemovePlayerAction, UpdatePlayerAction } from "../../utils/propsType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TournamentState {
    games: Game[];
    lastSelectedPlayer?: LastSelectedPlayerAction;
  }
  const initialState: TournamentState = {
    games: [],
    lastSelectedPlayer: {gameId: null, teamIndex: null,playerIndex: null}
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
        const words = name.split(" ").map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });
        const capitalizedName = words.join(" ");    
        state.games[gameId].teams[teamIndex].players[playerIndex] = {name:capitalizedName,age};
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
      setLastSelectedPlayer: (state, action: PayloadAction<LastSelectedPlayerAction>) => {
        const { gameId, teamIndex, playerIndex } = action.payload;
        state.lastSelectedPlayer = { gameId, teamIndex, playerIndex};
      }
    },
  });

  export const {setTournaments,updatePlayer,addPlayer, removePlayer, setLastSelectedPlayer} = tournamentSlice.actions;
  export default tournamentSlice.reducer;