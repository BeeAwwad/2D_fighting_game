// class for making new players
class Sprite {
  constructor({ position, velocity, canvasHeight }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.canvasHeight = canvasHeight;
  }
  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, 50, this.height);
  }
  update(ctx) {
    this.draw(ctx);
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y >= this.canvasHeight) {
      this.velocity.y = 0;
    }
  }
}

export default Sprite;
