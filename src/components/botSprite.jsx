import Sprite from "./sprite";
import gameWorld from "./gameWorld";

const botSprite = new Sprite({
  position: {
    x: 600, // Set the bot's initial position
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
    body: "purple", // Choose a color for the bot
    attack: "green",
  },
});

export default botSprite;
