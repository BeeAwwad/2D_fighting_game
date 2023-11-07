import Sprite from "./sprite";
import gameWorld from "./gameWorld";

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
    body: "red",
    attack: "blue",
  },
});

export default playerSprite;
