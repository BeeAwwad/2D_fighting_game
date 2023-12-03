import HealthBar from "./HealthBar"
import Timer from "./Timer"
import PropTypes from "prop-types"

function GameBar(props) {
  const { player, enemy } = props

  return (
    <div className="absolute flex w-full items-center p-4">
      <HealthBar fighter={player} />
      <Timer />
      <HealthBar fighter={enemy} />
    </div>
  )
}

GameBar.propTypes = {
  player: PropTypes.object.isRequired,
  enemy: PropTypes.object.isRequired,
}

export default GameBar
