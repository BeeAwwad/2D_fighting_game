import useGame from "../hooks/useGame"
import GameBar from "./topBarComponents/GameBar"
import gameWorld from "../gameObjects/gameWorld"
import { MatchResult } from "./MatchResult"

const GameCanvas = () => {
  const [ref, currentPlayer, currentEnemy, time, fightResults] = useGame()
  return (
    <div className="relative inline-block">
      <GameBar player={currentPlayer} enemy={currentEnemy} time={time} />
      {/* Canvas for the game */}
      <MatchResult fightResults={fightResults} />
      <canvas
        ref={ref}
        width={gameWorld.canvasWidth}
        height={gameWorld.canvasHeight}
      />
    </div>
  )
}

export default GameCanvas
