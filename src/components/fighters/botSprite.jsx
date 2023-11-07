import Sprite from "../sprite";
import gameWorld from "../gameWorld";

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
    body: "#7B1E57", // Choose a color for the bot
    attack: "#A9C53D",
  },
});

export default botSprite;
