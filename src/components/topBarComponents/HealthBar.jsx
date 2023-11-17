import { useEffect } from "react";

function HealthBar({ fighter }) {
    
  // Calculate health bar based on fighter health
  function calculateHealthBar(health) {
    if (health === 100) {
      return 100;
    } else if (health === 80) {
      return 80;
    } else if (health === 60) {
      return 60;
    } else if (health === 40) {
      return 40;
    } else if (health === 20) {
      return 20;
    } else {
      return 0;
    }
  }

  // Update health bar when fighter health changes
  useEffect(() => {
    console.log("Health updated:", fighter.health);
  }, [fighter.health]);

  const healthBar = calculateHealthBar(fighter.health);

  return (
    <div className="relative h-8 w-full">
      <div className="bg-gray-300 h-8"></div>
      <div
        className={`absolute bg-red-600 top-0 right-0 bottom-0 left-0`}
        style={{ width: `${healthBar}%` }}
      >
        {healthBar}
      </div>
    </div>
  );
}

export default HealthBar;
