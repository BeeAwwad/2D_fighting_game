import PropTypes from "prop-types"

function HealthBar({ fighter }) {
  console.log(fighter)
  const fighterHealth = fighter.health
  const healthBar = calculateHealthBar(fighterHealth)

  function calculateHealthBar(health) {
    return Math.floor(health / 10) * 10
  }

  return (
    <div className="relative h-8 w-full">
      <div className="bg-gray-300 h-8"></div>
      <div
        className={`absolute bg-red-600 top-0 right-0 bottom-0 left-0`}
        style={{ width: `${healthBar}%` }}
      >
        {fighterHealth}
      </div>
    </div>
  )
}

HealthBar.propTypes = {
  fighter: PropTypes.object.isRequired,
}

export default HealthBar
