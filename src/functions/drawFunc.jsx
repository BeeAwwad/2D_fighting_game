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
  if (sprite.isttacking) {
    ctx.fillStyle = sprite.color.attack
    ctx.fillRect(
      sprite.attackBox.position.x,
      sprite.attackBox.position.y,
      sprite.attackBox.width,
      sprite.attackBox.height
    )
  }
}

export const DrawImage = (ctx, sprite, scale, framesMax, framesCurrent) => {
  ctx.drawImage(
    sprite.image,
    framesCurrent * (sprite.image.width / framesMax),
    0,
    sprite.image.width / framesMax,
    sprite.image.height,
    sprite.position.x - sprite.imageOffset.x,
    sprite.position.y - sprite.imageOffset.y,
    (sprite.image.width / framesMax) * scale,
    sprite.image.height * scale
  )
}
