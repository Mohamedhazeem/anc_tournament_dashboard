import React, { ChangeEvent, useState } from "react";
import { Player } from "../utils/propsType";

interface PlayerComponentProps {
  playerName?: string;
  playerAge?: number;
  isAddPlayer?: boolean;
}

function PlayerComponent({
  playerName,
  playerAge,
  isAddPlayer,
}: PlayerComponentProps) {
  const [playerData, setPlayerData] = useState<Player>({
    name: playerName,
    age: playerAge,
  });
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerData({ ...playerData, name: event.target.value });
  };
  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerData({ ...playerData, age: Number(event.target.value) });
  };
  return (
    <div className="player">
      <input
        className="player-name"
        type="text"
        name="name"
        value={isAddPlayer ? "" : playerData.name}
        onChange={handleNameChange}
        placeholder={"Player Name"}
      />
      <input
        className="player-age"
        type="text"
        name="age"
        value={isAddPlayer ? "" : playerData.age}
        onChange={handleAgeChange}
        placeholder={"Age"}
      />
      <button type="button" className="save-button">
        Save
      </button>
    </div>
  );
}

export default PlayerComponent;
