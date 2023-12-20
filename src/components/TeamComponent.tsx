import React, { useState } from "react";
import { Team } from "../utils/propsType";
import PlayerComponent from "./PlayerComponent";

interface TeamComponentProps {
  teams: Team[];
}

function TeamComponent({ teams }: TeamComponentProps) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <ul>
      {teams.map((team, index) => (
        <li key={index}>
          <p className="team-name">{`${team.team_name} (${team.players.length})`}</p>
          <ul className="team-list">
            <li>{<PlayerComponent isAddPlayer={true} />}</li>
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
