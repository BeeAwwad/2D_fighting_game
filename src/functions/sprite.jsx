import { DrawImage } from "./drawFunc"
import gameWorld from "../gameObjects/gameWorld"

export class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    imageOffset = { x: 0, y: 0 },
  }) {
    this.position = position
    this.width = 50
    this.height = 150
    this.ctx = null
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.framesMax = framesMax
    this.frameCurrent = 0
    this.frameElasped = 0
    this.frameHold = 10
    this.imageOffset = imageOffset
  }

  setContext(ctx) {
    if (ctx == null) {
      throw new Error("Context cannot be null")
    }
    this.ctx = ctx
  }

  draw() {
    DrawImage(this.ctx, this, this.scale, this.framesMax, this.frameCurrent)
  }

  animateFrames() {
    this.frameElasped++

    if (this.frameElasped % this.frameHold === 0) {
      if (this.frameCurrent < this.framesMax - 1) {
        this.frameCurrent++
      } else {
        this.frameCurrent = 0
      }
    }
  }

  render() {
    if (this.ctx && this.image.complete) {
      this.draw()
      this.animateFrames()
    }
  }
}

export class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    offset,
    imageSrc,
    scale = 1,
    framesMax = 1,
    imageOffset = { x: 0, y: 0 },
    sprites,
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      imageOffset,
    })

    this.velocity = velocity
    this.canvasHeight = gameWorld.canvasHeight
    this.gravity = gameWorld.gravity
    this.lastKey = null
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: { x: offset.x, y: offset.y },
      width: 100,
      height: 50,
    }
    this.isAttacking = false
    this.attackCooldown = false
    this.health = 100
    this.frameCurrent = 0
    this.frameElasped = 0
    this.frameHold = 12
    this.sprites = sprites

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }
  }

  update() {
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y >= this.canvasHeight) {
      this.velocity.y = 0
    } else {
      this.velocity.y += this.gravity
    }
  }

  render() {
    if (this.ctx && this.image.complete) {
      this.draw()
      this.animateFrames()
    }
  }

  attack() {
    if (!this.isAttacking) {
      this.isAttacking = true
      setTimeout(() => {
        this.isAttacking = false
      }, 100)
    }
  }
}
