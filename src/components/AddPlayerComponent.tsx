import { ChangeEvent, useState, useEffect } from "react";
import { Player } from "../utils/propsType";
import { useDispatch } from "react-redux";
import { addPlayer } from "../store/slice/tournamentSlice";

interface PlayerComponentProps {
  gameId?: number;
  teamIndex?: number;
}

function AddPlayerComponent({ gameId, teamIndex }: PlayerComponentProps) {
  const dispatch = useDispatch();
  const [PlayerData, setPlayerData] = useState<Player>({
    name: "",
    age: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerData({ ...PlayerData, name: event.target.value });
    setIsEditing(true);
  };
  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerData({
      ...PlayerData,
      age: !isNaN(Number(event.target.value))
        ? Number(event.target.value)
        : PlayerData.age,
    });
    setIsEditing(true);
  };
  const handleAdd = () => {
    console.log(
      `add ${gameId!} and ${teamIndex!} with player name ${PlayerData.name!} and age is ${PlayerData.age!}`
    );
    dispatch(
      addPlayer({
        gameId: gameId!,
        teamIndex: teamIndex!,
        name: PlayerData.name!,
        age: PlayerData.age!,
      })
    );
    setPlayerData({ name: "", age: 0 });
    setIsEditing(false);
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
      <button
        type="button"
        className={`${isEditing ? "save-focus-button" : "save-unfocus-button"}`}
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}

export default AddPlayerComponent;
