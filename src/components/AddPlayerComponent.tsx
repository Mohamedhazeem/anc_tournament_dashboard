import React, { ChangeEvent, useState } from "react";
import { Player } from "../utils/propsType";

interface PlayerComponentProps {
  playerName?: string;
  playerAge?: number;
  isAddPlayer?: boolean;
}

function AddPlayerComponent({ playerName, playerAge }: PlayerComponentProps) {
  const [PlayerData, setPlayerData] = useState<Player>({
    name: playerName,
    age: playerAge,
  });
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerData({ ...PlayerData, name: event.target.value });
  };
  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerData({
      ...PlayerData,
      age: !isNaN(Number(event.target.value))
        ? Number(event.target.value)
        : PlayerData.age,
    });
  };
  return (
    <div className="player">
      <input
        className="player-name"
        type="text"
        name="name"
        value={PlayerData.name}
        onChange={handleNameChange}
        placeholder={"Player Name"}
      />
      <input
        className="player-age"
        type="text"
        name="age"
        value={PlayerData.age ? PlayerData.age : ""}
        onChange={handleAgeChange}
        placeholder={"Age"}
      />
      <button type="button" className="save-button">
        Add
      </button>
    </div>
  );
}

export default AddPlayerComponent;
