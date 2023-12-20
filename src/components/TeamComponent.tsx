import React, { useState } from "react";
import { Team } from "../utils/propsType";
import PlayerComponent from "./PlayerComponent";
import AddPlayerComponent from "./AddPlayerComponent";

interface TeamComponentProps {
  gameId: number;
  teams: Team[];
}

function TeamComponent({ gameId, teams }: TeamComponentProps) {
  return (
    <ul>
      {teams.map((team, index) => (
        <li key={index}>
          <p className="team-name">{`${team.team_name} (${team.players.length})`}</p>
          <ul className="team-list">
            <li>{<AddPlayerComponent gameId={gameId} teamIndex={index} />}</li>
            {team.players.map((player, playerIndex) => (
              <li key={crypto.randomUUID()}>
                <PlayerComponent
                  teamIndex={index}
                  playerIndex={playerIndex}
                  gameId={gameId}
                  playerName={player.name}
                  playerAge={player.age}
                />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
export default TeamComponent;
