import { ChangeEvent, useState } from "react";
import { LastSelectedPlayerAction, Player } from "../utils/propsType";
import { useDispatch, useSelector } from "react-redux";
import {
  removePlayer,
  setLastSelectedPlayer,
  updatePlayer,
} from "../store/slice/tournamentSlice";
import { RootState } from "../store/store";

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
  const lastSelectedPlayer = useSelector(
    (state: RootState) => state.tournamentSlice.lastSelectedPlayer
  );

  const [player, setPlayer] = useState<Player>({
    name: playerName,
    age: playerAge,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value =
      field === "age"
        ? isNaN(Number(event.target.value))
          ? player.age
          : Number(event.target.value)
        : event.target.value;
    setPlayer({ ...player, [field]: value });
    setIsEditing(true);
    handleLastSelectedPlayer({
      gameId: gameId!,
      teamIndex: teamIndex!,
      playerIndex: playerIndex!,
    });
  };

  const handleDisable = (): boolean => {
    if (lastSelectedPlayer?.gameId == null) return false;
    if (
      lastSelectedPlayer?.gameId == gameId &&
      lastSelectedPlayer?.teamIndex == teamIndex &&
      lastSelectedPlayer?.playerIndex == playerIndex
    ) {
      return false;
    }
    return true;
  };
  const handleLastSelectedPlayer = ({
    gameId,
    teamIndex,
    playerIndex,
  }: LastSelectedPlayerAction) => {
    dispatch(
      setLastSelectedPlayer({
        gameId,
        teamIndex,
        playerIndex,
      })
    );
  };
  const handleSave = () => {
    const { name, age } = player;
    if (!name && !age) {
      dispatch(
        removePlayer({
          gameId: gameId!,
          teamIndex: teamIndex!,
          playerIndex: playerIndex!,
        })
      );
      handleLastSelectedPlayer({
        gameId: null,
        teamIndex: null,
        playerIndex: null,
      });
      return;
    }
    if (!name || !age) {
      alert(`Please enter ${name ? "Player Age" : "Player Name"} `);
      return;
    }
    dispatch(
      updatePlayer({
        gameId: gameId!,
        teamIndex: teamIndex!,
        playerIndex: playerIndex!,
        name: name,
        age: age,
      })
    );
    handleLastSelectedPlayer({
      gameId: null,
      teamIndex: null,
      playerIndex: null,
    });
    setIsEditing(false);
  };
  return (
    <div className="player">
      <input
        className={`${isEditing ? "input-focus" : "input-unfocus"} player-name`}
        type="text"
        name="name"
        value={player.name}
        onChange={(e) => handleInputChange(e, e.target.name)}
        placeholder={"Player Name"}
        disabled={handleDisable()}
      />
      <input
        className={`${isEditing ? "input-focus" : "input-unfocus"} player-age`}
        type="text"
        name="age"
        value={player.age ? player.age : ""}
        onChange={(e) => handleInputChange(e, e.target.name)}
        placeholder={"Age"}
        disabled={handleDisable()}
      />
      <button
        type="button"
        className={`transition duration-300 ${
          isEditing ? "save-focus-button button-hover" : "save-unfocus-button"
        }`}
        onClick={handleSave}
        disabled={handleDisable()}
      >
        Save
      </button>
    </div>
  );
}

export default PlayerComponent;
