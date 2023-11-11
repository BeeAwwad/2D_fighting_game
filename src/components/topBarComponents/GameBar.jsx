import HealthBar from "./HealthBar";
import Timer from "./Timer";

function GameBar() {
  return (
    <div className="absolute flex w-full items-center p-4">
      <HealthBar />
      <Timer />
      <HealthBar />
    </div>
  );
}

export default GameBar;
