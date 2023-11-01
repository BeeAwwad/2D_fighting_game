import Canvas from "./components/canvas";
import Sprite from "./components/sprite";

function App() {
  const canvasHeight = 576;
  const canvasWidth = 1024;
  const gravity = 0.2;

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

  const draw = (ctx) => {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    ctx.fillStyle = "black";

    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

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
