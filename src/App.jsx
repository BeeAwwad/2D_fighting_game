import Canvas from "./components/canvas";
import Sprite from "./components/sprite";
import Keys from "./components/keys";
import { useEffect } from "react";

function App() {
  const gameWorld = {
    canvasHeight: 576,
    canvasWidth: 1024,
    gravity: 0.7,
  };

  // Player Sprite
  const player = new Sprite({
    position: {
      x: 100,
      y: 100,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    offset: {
      x: 0,
      y: 0,
    },
    canvasHeight: gameWorld.canvasHeight,
    gravity: gameWorld.gravity,
    color: {
      body: "red",
      attack: "blue",
    },
  });

  // Enemy Sprite
  const enemy = new Sprite({
    position: {
      x: 850,
      y: 100,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    offset: {
      x: -50,
      y: 0,
    },
    canvasHeight: gameWorld.canvasHeight,
    gravity: gameWorld.gravity,
    color: {
      body: "orange",
      attack: "green",
    },
  });

  // Add an event listener to respond to the "d" key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "d") {
        Keys.d.pressed = true;
        player.lastKey = "d";
      } else if (e.key === "a") {
        Keys.a.pressed = true;
        player.lastKey = "a";
      } else if (e.key === " ") {
        player.velocity.y = -18;
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
        player.attack();
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
  }, [player]);

  return (
    <div>
      <Canvas
        width={gameWorld.canvasWidth}
        height={gameWorld.canvasHeight}
        player={player}
        enemy={enemy}
      />
    </div>
  );
}

export default App;
