import { useRef, useEffect } from "react";
import Keys from "./keys";

const useCanvas = (draw, player, enemy) => {
  const ref = useRef(null);

  // this useEffect renders the drawing to the canvas
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    let animationId;

    // renders the canvas, player and enemy
    const renderer = () => {
      draw(context);
      animationId = window.requestAnimationFrame(renderer);
      player.update(context);
      enemy.update(context);

      player.velocity.x = 0;

      if (Keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -5;
      } else if (Keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 5;
      }
    };
    renderer();

    // clean up funcition to remove cologging when rendering stops
    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [draw, player, enemy]);

  return ref;
};

export default useCanvas;
