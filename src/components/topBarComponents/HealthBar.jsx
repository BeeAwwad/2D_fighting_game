import PropTypes from "prop-types"

function HealthBar({ fighter, styles }) {
  const fighterHealth = fighter.health
  const healthBar = calculateHealthBar(fighterHealth)

  function calculateHealthBar(health) {
    return Math.floor(health / 10) * 10
  }

  return (
    <div className={`relative w-full bg-[#c52c18] h-8 ${styles}`}>
      <div
        className="absolute bg-[#dba572] h-full"
        style={{ width: `${healthBar}%` }}
      ></div>
    </div>
  )
}

HealthBar.propTypes = {
  fighter: PropTypes.object.isRequired,
  styles: PropTypes.string,
}

export default HealthBar
