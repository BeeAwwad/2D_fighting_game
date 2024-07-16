// create black canvas fuction
export const DrawCanvas = (ctx) => {
  // console.log("Canvas Context for DrawCanvas:", ctx);
  const canvasWidth = ctx.canvas.width
  const canvasHeight = ctx.canvas.height
  ctx.fillStyle = "black"

  ctx.fillRect(0, 0, canvasWidth, canvasHeight)
}
// Draw Player
export const DrawPlayer = (ctx, sprite) => {
  ctx.fillStyle = sprite.color.body
  ctx.fillRect(
    sprite.position.x,
    sprite.position.y,
    sprite.width,
    sprite.height
  )

  // attack box
  if (sprite.isAttacking) {
    ctx.fillStyle = sprite.color.attack
    ctx.fillRect(
      sprite.attackBox.position.x,
      sprite.attackBox.position.y,
      sprite.attackBox.width,
      sprite.attackBox.height
    )
  }
}

export const DrawBackground = (ctx, sprite) => {
  ctx.drawImage(sprite.image, sprite.position.x, sprite.position.y)
}
