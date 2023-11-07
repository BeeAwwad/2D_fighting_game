import Canvas from "./components/canvas";
import Keys from "./components/keys";
import { useEffect } from "react";
import playerSprite from "./components/fighters/playerSprite";
import botSprite from "./components/fighters/botSprite";
import gameWorld from "./components/gameWorld";

function App() {
  // Add an event listener to respond to the "d" key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "d") {
        Keys.d.pressed = true;
        playerSprite.lastKey = "d";
      } else if (e.key === "a") {
        Keys.a.pressed = true;
        playerSprite.lastKey = "a";
      } else if (e.key === " ") {
        playerSprite.velocity.y = -18;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "d") {
        Keys.d.pressed = false;
      } else if (e.key === "a") {
        Keys.a.pressed = false;
      } else if (e.key === " ") {
        Keys.space.pressed = false;
      }
    };

    // attack function
    const handleAttack = (e) => {
      if (e.button === 0) {
        playerSprite.attack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleAttack);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleAttack);
    };
  }, [playerSprite]);

  return (
    <div>
      <Canvas
        width={gameWorld.canvasWidth}
        height={gameWorld.canvasHeight}
        player={playerSprite}
        enemy={botSprite}
      />
    </div>
  );
}

export default App;
