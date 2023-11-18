import useCanvas from "./hooks/useCanvas";
import GameBar from "./topBarComponents/GameBar";
import gameWorld from "./gameWorld";
import { useContext } from "react";
import { FighterContext } from "../context/FighterContext";

const GameCanvas = () => {
  const { player, setPlayer, enemy, setEnemy } = useContext(FighterContext);
  const [ref] = useCanvas(player, setPlayer, enemy, setEnemy);
  return (
    <div className="relative inline-block">
      <GameBar player={player} enemy={enemy} />
      {/* Canvas for the game */}
      <canvas ref={ref} width={gameWorld.width} height={gameWorld.height} />
    </div>
  );
};

export default GameCanvas;
