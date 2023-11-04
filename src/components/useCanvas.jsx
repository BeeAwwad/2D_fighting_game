import { useRef, useEffect } from "react";
import Keys from "./keys";
import { DrawCanvas } from "./drawFunc";

const useCanvas = (player, enemy) => {
  const ref = useRef(null);

  // this useEffect renders the drawing to the canvas
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    let animationId;

    // renders the canvas, player and enemy
    const renderer = () => {
      DrawCanvas(context);
      animationId = window.requestAnimationFrame(renderer);
      player.update(context);
      enemy.update(context);

      player.velocity.x = 0;

      // move player left(a) or right(d)
      if (Keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -5;
      } else if (Keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 5;
      }

      // attack player
      if (
        player.position.x + player.attackBox.width >= enemy.position.x &&
        player.position.x <= enemy.position.x + enemy.width &&
        player.position.y + player.attackBox.height >= enemy.position.y &&
        player.attackBox.position.y <= enemy.position.y + enemy.height && player.isAttacking
      ) {
        console.log("I have been hit!");
      }
    };
    renderer();

    // clean up funcition to remove cologging when rendering stops
    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [player, enemy]);

  return ref;
};

export default useCanvas;
