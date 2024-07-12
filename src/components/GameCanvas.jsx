import useCanvas from "../hooks/useCanvas"
import GameBar from "./topBarComponents/GameBar"
import gameWorld from "../gameObjects/gameWorld"
import { MatchResult } from "./MatchResult"

const GameCanvas = () => {
  const [ref, currentPlayer, currentEnemy, gameTime] = useCanvas()

  return (
    <div className="relative inline-block">
      <GameBar player={currentPlayer} enemy={currentEnemy} time={gameTime} />
      {/* Canvas for the game */}
      <MatchResult />
      <canvas
        ref={ref}
        width={gameWorld.canvasWidth}
        height={gameWorld.canvasHeight}
      />
    </div>
  )
}

export default GameCanvas
