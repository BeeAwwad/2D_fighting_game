import HealthBar from "./HealthBar";
import Timer from "./Timer";

function GameBar(props) {
  const { player, enemy } = props;


  return (
    <div className="absolute flex w-full items-center p-4">
      <HealthBar fighter={player} />
      <Timer />
      <HealthBar fighter={enemy} />
    </div>
  );
}

export default GameBar;
