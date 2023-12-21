import { Team } from "../utils/propsType";
import PlayerComponent from "./PlayerComponent";
import AddPlayerComponent from "./AddPlayerComponent";
import { useState } from "react";

interface TeamComponentProps {
  gameId: number;
  teams: Team[];
}

function TeamComponent({ gameId, teams }: TeamComponentProps) {
  const [extendedTeams, setExtendedTeams] = useState<boolean[]>(
    new Array(teams.length).fill(false)
  );

  const toggleExtend = (teamIndex: number) => {
    setExtendedTeams((prevTeams) =>
      prevTeams.map((value, index) => (index === teamIndex ? !value : value))
    );
  };
  return (
    <ul>
      {teams.map((team, teamIndex) => (
        <li key={teamIndex}>
          <p className="team-name">{`${team.team_name} (${team.players.length})`}</p>
          <ul>
            <li>
              {<AddPlayerComponent gameId={gameId} teamIndex={teamIndex} />}
            </li>
            {team.players.map((player, playerIndex) => (
              <li
                key={crypto.randomUUID()}
                className={`mt-3 ${
                  !extendedTeams[teamIndex] && playerIndex >= 3
                    ? "hidden"
                    : "block"
                }`}
              >
                <PlayerComponent
                  teamIndex={teamIndex}
                  playerIndex={playerIndex}
                  gameId={gameId}
                  playerName={player.name}
                  playerAge={player.age}
                />
              </li>
            ))}
          </ul>
          <div
            className={`${
              team.players.length < 4 ? "hidden" : "extend-button"
            } `}
            onClick={() => toggleExtend(teamIndex)}
          >
            ...
          </div>
        </li>
      ))}
    </ul>
  );
}
export default TeamComponent;
