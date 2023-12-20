import React from "react";
import { Game } from "../utils/propsType";
import TeamComponent from "./TeamComponent";

function GameComponent({ game, teams }: Game) {
  return (
    <div>
      <h1 className="game">{game}</h1>
      <TeamComponent teams={teams} />
    </div>
  );
}

export default GameComponent;
