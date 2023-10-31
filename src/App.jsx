import Canvas from "./components/canvas";
import Sprite from "./components/sprite";

function App() {
  const draw = (ctx) => {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    ctx.fillStyle = "black";

    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const player = new Sprite({
      position: {
        x: 100,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    });
    player.draw(ctx);

    const enemy = new Sprite({
      position: {
        x: 900,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    });
    enemy.draw(ctx);
  };

  return (
    <Canvas
      draw={draw}
      width="1024"
      height="576"
      style={{ border: "10px solid black" }}
    />
  );
}

export default App;
