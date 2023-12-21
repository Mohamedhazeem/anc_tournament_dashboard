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

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayer({ ...player, name: event.target.value });
    setIsEditing(true);
    handleLastSelectedPlayer({
      gameId: gameId ?? null,
      teamIndex: teamIndex ?? null,
      playerIndex,
    });
  };
  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayer({
      ...player,
      age: !isNaN(Number(event.target.value))
        ? Number(event.target.value)
        : player.age,
    });
    setIsEditing(true);
    handleLastSelectedPlayer({
      gameId: gameId ?? null,
      teamIndex: teamIndex ?? null,
      playerIndex,
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
        gameId: gameId,
        teamIndex: teamIndex,
        playerIndex: playerIndex,
      })
    );
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
        onChange={handleNameChange}
        placeholder={"Player Name"}
        disabled={handleDisable()}
      />
      <input
        className={`${isEditing ? "input-focus" : "input-unfocus"} player-age`}
        type="text"
        name="age"
        value={player.age ? player.age : ""}
        onChange={handleAgeChange}
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
