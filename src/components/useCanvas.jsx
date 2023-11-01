import { useRef, useEffect } from "react";

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
    };
    renderer();

    // clean up funcition to remove cologging when rendering stops
    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [draw]);

  return ref;
};

export default useCanvas;
