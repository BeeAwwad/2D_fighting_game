import Canvas from "./components/canvas";
import Sprite from "./components/sprite";
import Keys from "./components/keys";
import { useEffect, useRef } from "react";

function App() {
  const canvasHeight = 576;
  const canvasWidth = 1024;
  const gravity = 0.2;
  const lastKey = useRef(null);

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
  });

  // create black canvas fuction
  const draw = (ctx) => {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    ctx.fillStyle = "black";

    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  // Add an event listener to respond to the "d" key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "d") {
        Keys.d.pressed = true;
        lastKey.current = "d";
      } else if (e.key === "a") {
        Keys.a.pressed = true;
        lastKey.current = "a";
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "d") {
        Keys.d.pressed = false;
      } else if (e.key === "a") {
        Keys.a.pressed = false;
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
      draw={draw}
      width={canvasWidth}
      height={canvasHeight}
      player={player}
      enemy={enemy}
      lastKey={lastKey}
    />
  );
}

export default App;
