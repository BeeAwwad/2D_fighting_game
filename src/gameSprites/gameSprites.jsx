import { Fighter, Sprite } from "../functions/sprite"
import samuraiIdle from "/samuraiMack/Idle.png"
import kenjiIdle from "/kenji/Idle.png"
import backgroundImage from "/background.png"
import shopImage from "/shop.png"

export const playerSprite = new Fighter({
  position: {
    x: 100,
    y: 100,
  },
  imageSrc: samuraiIdle,
  frameMax: 8,
  scale: 2.3,

  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageOffset: {
    x: 215,
    y: 225,
  },
})

export const botSprite = new Fighter({
  position: {
    x: 600,
    y: 100,
  },
  imageSrc: kenjiIdle,
  frameMax: 8,
  scale: 2.3,
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -50,
    y: 0,
  },
})

export const backgroundSprite = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: backgroundImage,
})

export const shopSprite = new Sprite({
  position: {
    x: 600,
    y: 128,
  },
  imageSrc: shopImage,
  scale: 2.75,
  frameMax: 6,
})
