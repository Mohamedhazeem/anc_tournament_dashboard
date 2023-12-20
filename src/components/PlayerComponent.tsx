import React, { ChangeEvent, useState } from "react";
import { Player } from "../utils/propsType";
import { useDispatch } from "react-redux";
import { updatePlayer } from "../store/slice/tournamentSlice";

interface PlayerComponentProps {
  playerName?: string;
  playerAge?: number;
  gameId?: number;
  teamIndex?: number;
  playerIndex?: number;
}

function PlayerComponent({
  playerName,
  playerAge,
  gameId,
  teamIndex,
  playerIndex,
}: PlayerComponentProps) {
  const dispatch = useDispatch();
  const [player, setPlayer] = useState<Player>({
    name: playerName,
    age: playerAge,
  });
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayer({ ...player, name: event.target.value });
  };
  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayer({
      ...player,
      age: !isNaN(Number(event.target.value))
        ? Number(event.target.value)
        : player.age,
    });
  };
  const handleSave = () => {
    console.log("save");
    dispatch(
      updatePlayer({
        gameId: gameId!,
        teamIndex: teamIndex!,
        playerIndex: playerIndex!,
        name: player.name!,
        age: player.age!,
      })
    );
  };
  return (
    <div className="player">
      <input
        className="player-name"
        type="text"
        name="name"
        value={player.name}
        onChange={handleNameChange}
        placeholder={"Player Name"}
      />
      <input
        className="player-age"
        type="text"
        name="age"
        value={player.age ? player.age : ""}
        onChange={handleAgeChange}
        placeholder={"Age"}
      />
      <button type="button" className="save-button" onClick={handleSave}>
        Save
      </button>
      <p>{playerIndex}</p>
    </div>
  );
}

export default PlayerComponent;
