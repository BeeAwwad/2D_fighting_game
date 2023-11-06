import { DrawPlayer } from "./drawFunc";
// class for making new players
class Sprite {
  constructor({ position, velocity, canvasHeight, gravity, color, offset }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.canvasHeight = canvasHeight;
    this.gravity = gravity;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = {
      body: color.body,
      attack: color.attack,
    };
    this.isAttacking;
  }

  update(ctx) {
    DrawPlayer(ctx, this);

    // this part allow me to be able to reverse the attack box of the enemy using the sprite.attackBox.offset property
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= this.canvasHeight) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += this.gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

export default Sprite;
