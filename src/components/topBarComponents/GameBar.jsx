import HealthBar from "./HealthBar";
import Timer from "./Timer";
import { useSelector } from "react-redux";

function GameBar() {
  const { playerHealth } = useSelector((state) => state.fighters);
  const { enemyHealth } = useSelector((state) => state.fighters);
  return (
    <div className="absolute flex w-full items-center p-4">
      <HealthBar fighter={playerHealth} />
      <Timer />
      <HealthBar fighter={enemyHealth} />
    </div>
  );
}

export default GameBar;
