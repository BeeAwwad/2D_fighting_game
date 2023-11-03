// create black canvas fuction
const DrawCanvas = (ctx) => {
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;
  ctx.fillStyle = "black";

  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};
// Draw Player
const DrawPlayer = (ctx, sprite) =>{
    ctx.fillStyle = "red";
    ctx.fillRect(sprite.position.x, sprite.position.y, 50, sprite.height);
  }
export { DrawCanvas, DrawPlayer };