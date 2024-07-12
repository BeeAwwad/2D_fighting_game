import Sprite from "../functions/sprite"

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
    x: -50,
    y: 0,
  },

  color: {
    body: "#7B1E57", // Choose a color for the bot
    attack: "#A9C53D",
  },
})

export default botSprite
