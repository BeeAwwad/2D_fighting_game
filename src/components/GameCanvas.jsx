import useCanvas from "./hooks/useCanvas"
import GameBar from "./topBarComponents/GameBar"
import gameWorld from "./gameWorld"

const GameCanvas = () => {
  const [ref, updatedPlayer, updatedEnemy] = useCanvas()

  return (
    <div className="relative inline-block">
      <GameBar player={updatedPlayer} enemy={updatedEnemy} />
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
