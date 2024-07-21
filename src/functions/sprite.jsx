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
    attackCooldownTime = 800,
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
    this.attackCooldownTime = attackCooldownTime
    this.attackCooldownEndTime = 0
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
    if (this.attackCooldown && Date.now() >= this.attackCooldownEndTime) {
      this.attackCooldown = false
    }

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y >= this.canvasHeight) {
      this.velocity.y = 0
      this.position.y = 426.69999999999993
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
    if (!this.isAttacking && !this.attackCooldown) {
      this.switchSprites("attackOne")
      this.isAttacking = true
      this.attackCooldown = true
      setTimeout(() => {
        this.isAttacking = false
        this.attackCooldown = false
      }, this.attackCooldownTime)

      this.attackCooldownEndTime = Date.now + this.attackCooldownTime
    }
  }

  switchSprites(sprite) {
    if (
      this.image === this.sprites.attackOne.image &&
      this.frameCurrent < this.sprites.attackOne.framesMax - 1
    )
      return

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image
          this.framesMax = this.sprites.idle.framesMax
          this.frameCurrent = 0
        }
        break
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image
          this.framesMax = this.sprites.run.framesMax
          this.frameCurrent = 0
        }
        break
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image
          this.framesMax = this.sprites.jump.framesMax
          this.frameCurrent = 0
        }
        break
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image
          this.framesMax = this.sprites.fall.framesMax
          this.frameCurrent = 0
        }
        break
      case "attackOne":
        if (this.image !== this.sprites.attackOne.image) {
          this.image = this.sprites.attackOne.image
          this.framesMax = this.sprites.attackOne.framesMax
          this.frameCurrent = 0
        }
        break
    }
  }
}
