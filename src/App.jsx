import Canvas from "./components/canvas";
import Sprite from "./components/sprite";
import { useEffect } from "react";

function App() {
  const canvasHeight = 576;
  const canvasWidth = 1024;
  const gravity = 0.2;

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
      x: 900,
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
    const handleKeyPress = (e) => {
      if (e.key === "d") {
        // Update the player's position by increasing the x-coordinate
        player.position.x += 5; // Adjust the value as needed
      } else if (e.key === "a") {
        player.position.x -= 5;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [player]);

  return (
    <Canvas
      draw={draw}
      width={canvasWidth}
      height={canvasHeight}
      player={player}
      enemy={enemy}
      // gravity={gravity}
    />
  );
}

export default App;
