import { DrawPlayer } from "./functions/drawFunc"
import { checkObject } from "./functions/checkObject"
import gameWorld from "./gameWorld"

// Constructor function for making new players
function Sprite({ position, velocity, color, offset }) {
  this.position = position
  this.velocity = velocity
  this.height = 150
  this.width = 50
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
  this.color = {
    body: color.body,
    attack: color.attack,
  }
  this.isAttacking = false
  this.attackCooldown = false // Added property to track cooldown
  this.health = 100
  this.ctx = null

  // makes sure the context is set before updating or rendering
  this.setContext = function (ctx) {
    if (ctx == null) {
      throw new Error("Context cannot be null")
    }
    this.ctx = ctx
  }

  this.update = function () {
    // this part allows me to reverse the attack box of the enemy using the sprite.attackBox.offset property
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y

    // player movement logic
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // gravity logic
    if (this.position.y + this.height + this.velocity.y >= this.canvasHeight) {
      this.velocity.y = 0 // this part prevents the player from falling through the ground
    } else {
      this.velocity.y += this.gravity // while this part makes the player fall down
    }

    // attack cooldown logic
  }

  this.render = function () {
    // console.log("Rendering with context:", this.ctx);
    if (checkObject(this.ctx)) {
      DrawPlayer(this.ctx, this)
    }
  }

  this.attack = function () {
    if (!this.isAttacking) {
      this.isAttacking = true
      setTimeout(() => {
        this.isAttacking = false
      }, 100)
    }
  }
}

export default Sprite
