import React, { useState } from "react";
import { Team } from "../utils/propsType";
import PlayerComponent from "./PlayerComponent";
import AddPlayerComponent from "./AddPlayerComponent";

interface TeamComponentProps {
  teams: Team[];
}

function TeamComponent({ teams }: TeamComponentProps) {
  return (
    <ul>
      {teams.map((team, index) => (
        <li key={index}>
          <p className="team-name">{`${team.team_name} (${team.players.length})`}</p>
          <ul className="team-list">
            <li>{<AddPlayerComponent />}</li>
            {team.players.map((player, playerIndex) => (
              <li key={playerIndex}>
                <PlayerComponent
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
