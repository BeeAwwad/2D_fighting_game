import { DrawPlayer } from "./drawFunc";
// class for making new players
class Sprite {
  constructor({ position, velocity, canvasHeight, gravity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.canvasHeight = canvasHeight;
    this.gravity = gravity;
    this.lastKey 
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
