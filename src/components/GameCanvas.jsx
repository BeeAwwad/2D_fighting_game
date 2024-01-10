import useCanvas from "./hooks/useCanvas"
import GameBar from "./topBarComponents/GameBar"
import gameWorld from "./gameWorld"

const GameCanvas = () => {
  const [ref, currentPlayer, currentEnemy, gameTime] = useCanvas()

  return (
    <div className="relative inline-block">
      <GameBar player={currentPlayer} enemy={currentEnemy} time={gameTime} />
      {/* Canvas for the game */}
      <canvas
        ref={ref}
        width={gameWorld.canvasWidth}
        height={gameWorld.canvasHeight}
      />
    </div>
  )
}

export default GameCanvas
