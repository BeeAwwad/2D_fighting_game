// class for making new players
class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
  }
  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, 50, 150);
  }
  update() {
    this.draw();
    this.position.y += 10;
  }
}

export default Sprite;
