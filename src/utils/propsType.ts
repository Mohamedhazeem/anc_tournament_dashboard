export interface Game {
    game: string;
    gameId: number;
    teams: Team[];
  }
  export interface Team {
    team_name: string;
    players: Player[];
}
export interface Player {
    name?: string;
    age?: number;
}
export interface UpdatePlayerAction {
    gameId: number; 
    teamIndex: number; 
    playerIndex: number;
    name: string;
    age: number;
  }
export interface AddPlayerAction{
    gameId: number; 
    teamIndex: number; 
    name: string;
    age: number;
}
export interface RemovePlayerAction{
  gameId: number; 
  teamIndex: number; 
  playerIndex: number;
}