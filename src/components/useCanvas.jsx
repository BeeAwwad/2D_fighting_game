import { useRef, useEffect } from "react";

const useCanvas = (draw, player, enemy) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    let animationId;

    const renderer = () => {
      draw(context);
      animationId = window.requestAnimationFrame(renderer);
      player.update(context);
      enemy.update(context);
    };
    renderer();

    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [draw]);

  return ref;
};

export default useCanvas;
