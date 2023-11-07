import Sprite from "../sprite";
import gameWorld from "../gameWorld";

// Player Sprite
const playerSprite = new Sprite({
  position: {
    x: 100,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  canvasHeight: gameWorld.canvasHeight,
  gravity: gameWorld.gravity,
  color: {
    body: "#DF1F2D",
    attack: "#2B3784",
  },
});

export default playerSprite;
