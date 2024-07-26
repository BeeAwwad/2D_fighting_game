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

  renderImage() {
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
    // offset,
    imageSrc,
    scale = 1,
    framesMax = 1,
    imageOffset = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
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
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    }
    this.isAttacking = false
    this.health = 100
    this.framesCurrent = 0
    this.frameElasped = 0
    this.frameHold = 12
    this.sprites = sprites
    this.isDead = false
    this.attackCooldown = false
    this.attackCooldownEndTime = 700

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
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y >= this.canvasHeight) {
      this.velocity.y = 0
      this.position.y = 426.69999999999993
    } else {
      this.velocity.y += this.gravity
    }
  }

  renderFighter() {
    if (this.ctx && this.image.complete) {
      this.draw()

      if (this.isDead === false) {
        this.animateFrames()
      } else {
        return
      }

      // this.ctx.fillRect(
      //   this.attackBox.position.x,
      //   this.attackBox.position.y,
      //   this.attackBox.width,
      //   this.attackBox.height
      // )
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
