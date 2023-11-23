import { useRef, useEffect, useContext } from "react";
import Keys from "../keys";
import { DrawCanvas } from "../drawFunc";
import updateBot from "../botLogic";
import useKeyboardMouse from "./useKeyboardMouse";
import { FighterContext } from "../../context/FighterContext";
import Sprite from "../sprite";

const useCanvas = () => {
  const { player, setPlayer, enemy, setEnemy } = useContext(FighterContext);

  const ref = useRef(null);

  const update = (ctx) => {
    // Update player logic
    setPlayer((prevPlayer) => {
      const updatedPlayer = new Sprite({ ...prevPlayer });
      updatedPlayer.setContext(ctx); // Pass the context to Sprite
      updatedPlayer.attackBox = { ...prevPlayer.attackBox };
      updatedPlayer.update();
      updatedPlayer.velocity.x = 0;

      // move player left(a) or right(d)
      if (Keys.a.pressed && updatedPlayer.lastKey === "a") {
        updatedPlayer.velocity.x = -5;
      } else if (Keys.d.pressed && updatedPlayer.lastKey === "d") {
        updatedPlayer.velocity.x = 5;
      }

      // Other modifications to player can be done here...

      return updatedPlayer;
    });

    // Additional update logic for enemy, collisions, etc.
    // updateBot(enemy, player);
  };

  const render = (ctx, cnv) => {


    ctx.clearRect(0, 0, cnv.width, cnv.height); // Clear the canvas
    DrawCanvas(ctx);

    // Render player
    player.render();

    // Render enemy, other game elements, etc.
    // enemy.render();
  };

  const gameLoop = (ctx, cnv) => {
    update(ctx);
    render(ctx, cnv);
    requestAnimationFrame(gameLoop);
  };

  // Call useKeyboardMouse hook to handle keyboard/mouse events for player control
  // useKeyboardMouse(player);

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

  // this useEffect renders the drawing to the canvas
  useEffect(() => {
    
    const canvas = ref.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      console.log("Canvas:", canvas);
      console.log("Context:", context);

      gameLoop(context, canvas); // Start the game loop when the component mounts
    }
  }, []);

  return [ref];
};

export default useCanvas;
