import { useEffect, useState } from "react"

function HealthBar({ fighter }) {
  console.log(fighter)
  const [fighterHealth, setFighterHealth] = useState(fighter.health)
  const [healthBar, setHealthBar] = useState(calculateHealthBar(fighter.health))

  function calculateHealthBar(health) {
    return Math.floor(health / 10) * 10
  }

  useEffect(() => {
    setFighterHealth((prevHealth) => {
      if (prevHealth !== fighter.health) {
        return fighter.health
      }
      return prevHealth
    })
  }, [fighter.health])

  useEffect(() => {
    setHealthBar(calculateHealthBar(fighterHealth))
  }, [fighterHealth])

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
