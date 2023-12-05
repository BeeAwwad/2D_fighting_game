import useCanvas from "./hooks/useCanvas"
import GameBar from "./topBarComponents/GameBar"
import gameWorld from "./gameWorld"
import PropTypes from "prop-types"

const GameCanvas = ({ player, enemy }) => {
  const [ref, currentPlayer, currentEnemy] = useCanvas({ player, enemy })

  return (
    <div className="relative inline-block">
      <GameBar player={currentPlayer} enemy={currentEnemy} />
      {/* Canvas for the game */}
      <canvas
        ref={ref}
        width={gameWorld.canvasWidth}
        height={gameWorld.canvasHeight}
      />
    </div>
  )
}

GameCanvas.propTypes = {
  player: PropTypes.object.isRequired,
  enemy: PropTypes.object.isRequired,
}

export default GameCanvas
