// create black canvas fuction
const DrawCanvas = (ctx) => {
  // console.log("Canvas Context for DrawCanvas:", ctx);
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;
  ctx.fillStyle = "black";

  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};
// Draw Player
const DrawPlayer = (ctx, sprite) => {
  // console.log("Player Sprite:", sprite);
  ctx.fillStyle = sprite.color.body;
  // console.log("Fill Style Set to: ", sprite.color.body);
  ctx.fillRect(
    sprite.position.x,
    sprite.position.y,
    sprite.width,
    sprite.height
  );
  // console.log(
  //   "Rectangle Filled around: ",
  //   sprite.position.x,
  //   sprite.position.y,
  //   sprite.width,
  //   sprite.height
  // );
  // attack box
  if (sprite.isAttacking) {
    ctx.fillStyle = sprite.color.attack;
    ctx.fillRect(
      sprite.attackBox.position.x,
      sprite.attackBox.position.y,
      sprite.attackBox.width,
      sprite.attackBox.height
    );
  }
};
export { DrawCanvas, DrawPlayer };
