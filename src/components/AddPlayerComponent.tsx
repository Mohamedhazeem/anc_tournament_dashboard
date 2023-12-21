import { ChangeEvent, useState, useEffect } from "react";
import { LastSelectedPlayerAction, Player } from "../utils/propsType";
import { useDispatch, useSelector } from "react-redux";
import {
  addPlayer,
  setLastSelectedPlayer,
} from "../store/slice/tournamentSlice";
import { RootState } from "../store/store";

interface PlayerComponentProps {
  gameId?: number;
  teamIndex?: number;
}

function AddPlayerComponent({ gameId, teamIndex }: PlayerComponentProps) {
  const dispatch = useDispatch();
  const lastSelectedPlayer = useSelector(
    (state: RootState) => state.tournamentSlice.lastSelectedPlayer
  );
  const [PlayerData, setPlayerData] = useState<Player>({
    name: "",
    age: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerData({ ...PlayerData, name: event.target.value });
    setIsEditing(true);
    handleLastSelectedPlayer({
      gameId: gameId ?? null,
      teamIndex: teamIndex ?? null,
      playerIndex: -1,
    });
  };
  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerData({
      ...PlayerData,
      age: !isNaN(Number(event.target.value))
        ? Number(event.target.value)
        : PlayerData.age,
    });
    setIsEditing(true);
    handleLastSelectedPlayer({
      gameId: gameId ?? null,
      teamIndex: teamIndex ?? null,
      playerIndex: -1,
    });
  };
  const handleLastSelectedPlayer = ({
    gameId,
    teamIndex,
    playerIndex,
  }: LastSelectedPlayerAction) => {
    dispatch(
      setLastSelectedPlayer({
        gameId: gameId,
        teamIndex: teamIndex,
        playerIndex: playerIndex,
      })
    );
  };

  const handleDisable = (): boolean => {
    if (lastSelectedPlayer?.gameId == null) return false;
    if (
      lastSelectedPlayer?.gameId == gameId &&
      lastSelectedPlayer?.teamIndex == teamIndex &&
      lastSelectedPlayer?.playerIndex == -1
    ) {
      return false;
    }
    return true;
  };

  const handleAdd = () => {
    if (!PlayerData.name && !PlayerData.age) {
      handleLastSelectedPlayer({
        gameId: null,
        teamIndex: null,
        playerIndex: null,
      });
      setIsEditing(false);
      return;
    } else if (!PlayerData.name || !PlayerData.age) {
      alert(`Please enter ${PlayerData.name ? "Player Age" : "Player Name"} `);
      return;
    }
    dispatch(
      addPlayer({
        gameId: gameId!,
        teamIndex: teamIndex!,
        name: PlayerData.name,
        age: PlayerData.age,
      })
    );
    handleLastSelectedPlayer({
      gameId: null,
      teamIndex: null,
      playerIndex: null,
    });
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
        disabled={handleDisable()}
      />
      <input
        className="player-age"
        type="text"
        name="age"
        value={PlayerData.age ? PlayerData.age : ""}
        onChange={handleAgeChange}
        placeholder={"Age"}
        disabled={handleDisable()}
      />
      <button
        type="button"
        className={`${isEditing ? "save-focus-button" : "save-unfocus-button"}`}
        onClick={handleAdd}
        disabled={handleDisable()}
      >
        Add
      </button>
    </div>
  );
}

export default AddPlayerComponent;
