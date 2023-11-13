function HealthBar({ fighter }) {
  let dynamicHealthBar = "w-full";

  // make width of health bar change when someone gets attacked
  if (fighter === 90) {
    dynamicHealthBar = "w-11/12";
  } else {
    dynamicHealthBar = "w-1/2";
  }
  return <div className={`bg-gray-200 h-8 ${dynamicHealthBar}`}>{fighter}</div>;
}

export default HealthBar;
