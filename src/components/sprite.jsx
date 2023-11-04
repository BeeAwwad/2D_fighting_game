import { DrawPlayer } from "./drawFunc";
// class for making new players
class Sprite {
  constructor({ position, velocity, canvasHeight, gravity,color }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.canvasHeight = canvasHeight;
    this.gravity = gravity;
    this.lastKey
    this.attackBox = {
      position: this.position,
      width: 100,
      height: 50,
    }
    this.color = {
      body: color.body,
      attack: color.attack,
    }
  }
  
  update(ctx) {
    DrawPlayer(ctx, this);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= this.canvasHeight) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += this.gravity;
    }
  }
}

export default Sprite;
