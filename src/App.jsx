import Canvas from "./components/canvas";
import Sprite from "./components/sprite";
import Keys from "./components/keys";
import { useEffect } from "react";

function App() {
  const canvasHeight = 576;
  const canvasWidth = 1024;
  const gravity = 0.7;

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
    canvasHeight: canvasHeight,
    gravity: gravity,
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
    canvasHeight: canvasHeight,
    gravity: gravity,
    color: {
      body: "orange",
      attack: "green",
    },
  });

  // Add an event listener to respond to the "d" key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(e.button);
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

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [player]);

  return (
    <Canvas
      width={canvasWidth}
      height={canvasHeight}
      player={player}
      enemy={enemy}
    />
  );
}

export default App;
