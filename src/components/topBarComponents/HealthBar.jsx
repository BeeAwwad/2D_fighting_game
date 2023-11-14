function HealthBar({ fighter }) {
  let dynamicHealthBar = "w-full";

  // make width of health bar change when someone gets attacked
  if (fighter.health <= 50) {
    dynamicHealthBar = "w-1/2";
  }

  return (
    <div className="relative h-8 w-full">
      <div className="bg-gray-300 h-8"></div>
      <div
        className={`absolute bg-red-600 top-0 right-0 bottom-0 left-0 ${dynamicHealthBar}`}
      >
        {fighter.health}
      </div>
    </div>
  );
}

export default HealthBar;
