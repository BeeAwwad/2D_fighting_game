import { Fighter, Sprite } from "../functions/sprite"

export const playerSprite = new Fighter({
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

  color: {
    body: "#DF1F2D",
    attack: "#2B3784",
  },
})

export const botSprite = new Fighter({
  position: {
    x: 600,
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
    body: "#7B1E57",
    attack: "#A9C53D",
  },
})

export const backgroundSprite = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "/background.png",
})
