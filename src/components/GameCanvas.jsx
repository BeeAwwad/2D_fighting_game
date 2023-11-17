import useCanvas from "./hooks/useCanvas";
import GameBar from "./topBarComponents/GameBar"
import gameWorld from "./gameWorld";

const GameCanvas = () => {
  const [ ref, player, enemy ] = useCanvas();
  return (
    <div className="relative inline-block">
      <GameBar player={player} enemy={enemy} />
      {/* Canvas for the game */}
      <canvas ref={ref} width={gameWorld.width} height={gameWorld.height} />
      
    </div>
  );
};

export default GameCanvas;
