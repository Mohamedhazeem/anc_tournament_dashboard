import { ChangeEvent, useState } from "react";
import { Player } from "../utils/propsType";
import { useDispatch } from "react-redux";
import { removePlayer, updatePlayer } from "../store/slice/tournamentSlice";

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
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayer({ ...player, name: event.target.value });
    setIsEditing(true);
  };
  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayer({
      ...player,
      age: !isNaN(Number(event.target.value))
        ? Number(event.target.value)
        : player.age,
    });
    setIsEditing(true);
  };
  const handleSave = () => {
    if (!player.age && !player.name) {
      dispatch(
        removePlayer({
          gameId: gameId!,
          teamIndex: teamIndex!,
          playerIndex: playerIndex!,
        })
      );
      return;
    }
    if (!player.name || !player.age) {
      alert(`Please enter ${player.name ? "Player Age" : "Player Name"} `);
      return;
    }
    dispatch(
      updatePlayer({
        gameId: gameId!,
        teamIndex: teamIndex!,
        playerIndex: playerIndex!,
        name: player.name,
        age: player.age,
      })
    );
    setIsEditing(false);
  };
  return (
    <div className="player">
      <input
        className={`${isEditing ? "input-focus" : "input-unfocus"} player-name`}
        type="text"
        name="name"
        value={player.name}
        onChange={handleNameChange}
        placeholder={"Player Name"}
      />
      <input
        className={`${isEditing ? "input-focus" : "input-unfocus"} player-age`}
        type="text"
        name="age"
        value={player.age ? player.age : ""}
        onChange={handleAgeChange}
        placeholder={"Age"}
      />
      <button
        type="button"
        className={`transition duration-300 ${
          isEditing ? "save-focus-button button-hover" : "save-unfocus-button"
        }`}
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}

export default PlayerComponent;
