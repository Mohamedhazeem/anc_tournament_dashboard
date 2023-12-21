import { Game } from "../utils/propsType";
import TeamComponent from "./TeamComponent";

function GameComponent({ game, gameId, teams }: Game) {
  return (
    <div className="game-container">
      <h1 className="game-name">{game}</h1>
      <TeamComponent teams={teams} gameId={gameId} />
    </div>
  );
}

export default GameComponent;
