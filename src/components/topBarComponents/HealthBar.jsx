import { useEffect, useState } from "react"

function HealthBar({ fighter }) {
  const [fighterHealth, setFighterHealth] = useState(0)

  function calculateHealthBar(health) {
    return Math.floor(health / 10) * 10
  }
  console.log(fighter.health)
  // Update health bar when fighter health changes
  useEffect(() => {
    console.log("Health updated:", fighterHealth)
    setFighterHealth(fighter.health)
  }, [fighter.health])

  let healthBar = calculateHealthBar(fighterHealth)

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

export default HealthBar
