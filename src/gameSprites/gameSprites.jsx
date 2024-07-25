import { Fighter, Sprite } from "../functions/sprite"
import samuraiIdle from "/samuraiMack/Idle.png"
import samuraiRun from "/samuraiMack/Run.png"
import samuraiJump from "/samuraiMack/Jump.png"
import samuraiFall from "/samuraiMack/Fall.png"
import samuraiAttackOne from "/samuraiMack/Attack1.png"
import kenjiIdle from "/kenji/Idle.png"
import kenjiRun from "/kenji/Run.png"
import kenjiJump from "/kenji/Jump.png"
import kenjiFall from "/kenji/Fall.png"
import kenjiAttackOne from "/kenji/Attack1.png"
import backgroundImage from "/background.png"
import shopImage from "/shop.png"

export const playerSprite = new Fighter({
  position: {
    x: 100,
    y: 100,
  },
  imageSrc: samuraiIdle,
  framesMax: 8,
  scale: 2.3,

  velocity: {
    x: 0,
    y: 0,
  },
  imageOffset: {
    x: 215,
    y: 225,
  },
  sprites: {
    idle: {
      imageSrc: samuraiIdle,
      framesMax: 8,
    },
    run: {
      imageSrc: samuraiRun,
      framesMax: 8,
    },
    jump: {
      imageSrc: samuraiJump,
      framesMax: 2,
    },
    fall: {
      imageSrc: samuraiFall,
      framesMax: 2,
    },
    attackOne: {
      imageSrc: samuraiAttackOne,
      framesMax: 6,
    },
  },
  attackBox: {
    offset: {
      x: 75,
      y: -30,
    },
    width: 145,
    height: 50,
  },
})

export const botSprite = new Fighter({
  position: {
    x: 600,
    y: 100,
  },
  imageSrc: kenjiIdle,
  framesMax: 4,
  scale: 2.3,
  velocity: {
    x: 0,
    y: 0,
  },
  imageOffset: {
    x: 215,
    y: 235,
  },
  sprites: {
    idle: {
      imageSrc: kenjiIdle,
      framesMax: 4,
    },
    run: {
      imageSrc: kenjiRun,
      framesMax: 8,
    },
    jump: {
      imageSrc: kenjiJump,
      framesMax: 2,
    },
    fall: {
      imageSrc: kenjiFall,
      framesMax: 2,
    },
    attackOne: {
      imageSrc: kenjiAttackOne,
      framesMax: 4,
    },
  },
  attackBox: {
    offset: {
      x: -165,
      y: -30,
    },
    width: 125,
    height: 50,
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
  framesMax: 6,
})
