export interface Game {
    game: string;
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
