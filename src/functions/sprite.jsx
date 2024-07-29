import {
  DrawImage,
  DrawFlippedImage,
  HandleAttackInvert,
  DrawPlayer,
} from "./drawFunc"
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
    this.framesCurrent = 0
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
    DrawImage(this.ctx, this, this.scale, this.framesMax, this.framesCurrent)
  }

  animateFrames() {
    this.frameElasped++

    if (this.frameElasped % this.frameHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
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
    fighterType,
    position,
    velocity,
    imageSrc,
    scale = 1,
    framesMax = 1,
    imageOffset = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
    color,
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      imageOffset,
    })

    this.fighterType = fighterType
    this.velocity = velocity
    this.isFacing = null
    this.canvasHeight = gameWorld.canvasHeight
    this.gravity = gameWorld.gravity
    this.lastKey = null
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    }
    this.color = color.body
    this.isAttacking = false
    this.health = 100
    this.framesCurrent = 0
    this.frameElasped = 0
    this.frameHold = 7
    this.sprites = sprites
    this.isDead = false
    this.attackCooldown = false
    this.attackCooldownEndTime = 700

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }
  }

  update(secondsPassed) {
    if (
      this.attackCooldown &&
      performance.now() >= this.attackCooldownEndTime
    ) {
      this.attackCooldown = false
    }

    HandleAttackInvert(this, this.fighterType, this.isFacing)

    this.position.x += this.velocity.x * secondsPassed
    this.position.y += this.velocity.y

    if (
      this.position.y + this.height + this.velocity.y >=
      this.canvasHeight - 95
    ) {
      this.velocity.y = 0
      // this.position.y = 426.69999999999993
    } else {
      this.velocity.y += this.gravity
    }
  }

  draw() {
    DrawPlayer(this.ctx, this, this.color)

    DrawFlippedImage(
      this.ctx,
      this,
      this.scale,
      this.framesMax,
      this.framesCurrent,
      this.isFacing,
      this.fighterType
    )
  }

  render() {
    if (this.ctx && this.image.complete) {
      this.draw()

      if (this.isDead === false) {
        this.animateFrames()
      } else {
        return
      }
    }
  }

  attack() {
    this.switchSprites("attackOne")
    this.isAttacking = true
  }

  takeHit() {
    this.health -= 10
    if (this.health <= 0) {
      this.switchSprites("death")
    } else {
      this.switchSprites("takeHit")
    }
  }

  switchSprites(sprite) {
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.framesMax - 1) {
        this.isDead = true
      }
      return
    }

    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.framesMax - 1
    ) {
      return
    }

    if (
      this.image === this.sprites.attackOne.image &&
      this.framesCurrent < this.sprites.attackOne.framesMax - 1
    ) {
      return
    }

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image
          this.framesMax = this.sprites.idle.framesMax
          this.framesCurrent = 0
        }
        break
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image
          this.framesMax = this.sprites.run.framesMax
          this.framesCurrent = 0
        }
        break
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image
          this.framesMax = this.sprites.jump.framesMax
          this.framesCurrent = 0
        }
        break
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image
          this.framesMax = this.sprites.fall.framesMax
          this.framesCurrent = 0
        }
        break
      case "attackOne":
        if (this.image !== this.sprites.attackOne.image) {
          this.image = this.sprites.attackOne.image
          this.framesMax = this.sprites.attackOne.framesMax
          this.framesCurrent = 0
        }
        break
      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image
          this.framesMax = this.sprites.takeHit.framesMax
          this.framesCurrent = 0
        }
        break
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image
          this.framesMax = this.sprites.death.framesMax
          this.framesCurrent = 0
        }
        break
    }
  }
}

export class FpsCounter {
  constructor() {
    this.fps = 0
    this.ctx = null
    this.lastTime = 0
  }

  update(secondsPassed) {
    if (secondsPassed) {
      this.fps = Math.trunc(1 / secondsPassed)
    }
  }

  setContext(ctx) {
    if (ctx == null) {
      throw new Error("Context cannot be null")
    }
    this.ctx = ctx
  }

  draw() {
    if (this.ctx) {
      this.ctx.font = "bold 30px Copperplate, Papyrus, fantasy"
      this.ctx.fillStyle = "white"
      this.ctx.textAlign = "center"
      this.ctx.fillText(`FPS: ${this.fps}`, this.ctx.canvas.width / 2, 30)
    }
  }

  render() {
    if (this.ctx) {
      this.draw()
    }
  }
}
