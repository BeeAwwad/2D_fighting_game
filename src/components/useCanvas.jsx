import { useRef, useEffect } from "react";
import Keys from "./keys";
import { DrawCanvas } from "./drawFunc";
import updateBot from "./botLogic";
import { useDispatch } from "react-redux";
import { affectPlayerHealth, affectEnemyHealth } from "../redux/health";

const useCanvas = (player, enemy) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  // this useEffect renders the drawing to the canvas
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    let animationId;

    // collision statements between attack box and body box
    const rectangularCollision = ({ rectangle1, rectangle2 }) => {
      return (
        rectangle1.position.x +
          rectangle1.attackBox.width +
          rectangle1.attackBox.offset.x >=
          rectangle2.position.x &&
        rectangle1.position.x + rectangle1.attackBox.offset.x <=
          rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + rectangle1.attackBox.height >=
          rectangle2.position.y &&
        rectangle1.attackBox.position.y <=
          rectangle2.position.y + rectangle2.height
      );
    };

    // renders the canvas, player and enemy
    const renderer = () => {
      DrawCanvas(context);
      animationId = window.requestAnimationFrame(renderer);
      player.update(context);
      enemy.update(context);
      // render the bot logic
      updateBot(enemy, player);

      player.velocity.x = 0;

      // move player left(a) or right(d)
      if (Keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -5;
      } else if (Keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 5;
      }

      // detect successful attack
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: enemy,
        }) &&
        player.isAttacking
      ) {
        dispatch(affectEnemyHealth(-10));
      }

      if (
        rectangularCollision({
          rectangle1: enemy,
          rectangle2: player,
        }) &&
        enemy.isAttacking
      ) {
        dispatch(affectPlayerHealth(-10));
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
