import HealthBar from "./HealthBar"
import Timer from "./Timer"
import PropTypes from "prop-types"

function GameBar(props) {
  const { player, enemy, time } = props

  return (
    <div className="absolute flex w-full items-center p-4">
      <HealthBar fighter={player} styles={"flex justify-end"} />
      <Timer time={time} />
      <HealthBar fighter={enemy} styles={""} />
    </div>
  )
}

GameBar.propTypes = {
  player: PropTypes.object.isRequired,
  enemy: PropTypes.object.isRequired,
  time: PropTypes.number,
}

export default GameBar
