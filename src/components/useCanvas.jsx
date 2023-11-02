import { useRef, useEffect } from "react";
import Keys from "./keys";

const useCanvas = (draw, player, enemy, lastKey) => {
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

      if (Keys.a.pressed && lastKey.current === 'a') {
        player.velocity.x = -1;
      } else if (Keys.d.pressed && lastKey.current === 'd') {
        player.velocity.x = 1;
      }
    };
    renderer();

    // clean up funcition to remove cologging when rendering stops
    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [draw, player, enemy, lastKey]);

  return ref;
};

export default useCanvas;
