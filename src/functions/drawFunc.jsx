// create black canvas fuction
export const DrawCanvas = (ctx) => {
  const canvasWidth = ctx.canvas.width
  const canvasHeight = ctx.canvas.height
  ctx.fillStyle = "black"

  ctx.fillRect(0, 0, canvasWidth, canvasHeight)
}
// Draw Player
export const DrawPlayer = (ctx, sprite, color) => {
  ctx.fillStyle = color
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

export const DrawFlippedImage = (
  ctx,
  sprite,
  scale,
  framesMax,
  framesCurrent,
  isFacing,
  fighterType
) => {
  const width = sprite.image.width / framesMax
  const height = sprite.image.height
  const x = sprite.position.x - sprite.imageOffset.x
  const y = sprite.position.y - sprite.imageOffset.y

  ctx.save()
  if (fighterType === "rightFacing") {
    if (isFacing === "left") {
      ctx.scale(-1, 1)
      ctx.drawImage(
        sprite.image,
        framesCurrent * width,
        0,
        width,
        height,
        -x - width * scale,
        y,
        width * scale,
        height * scale
      )
    } else {
      ctx.drawImage(
        sprite.image,
        framesCurrent * width,
        0,
        width,
        height,
        x,
        y,
        width * scale,
        height * scale
      )
    }
    ctx.restore()
  } else if (fighterType === "leftFacing") {
    if (isFacing === "right") {
      ctx.scale(-1, 1)
      ctx.drawImage(
        sprite.image,
        framesCurrent * width,
        0,
        width,
        height,
        -x - width * scale,
        y,
        width * scale,
        height * scale
      )
    } else {
      ctx.drawImage(
        sprite.image,
        framesCurrent * width,
        0,
        width,
        height,
        x,
        y,
        width * scale,
        height * scale
      )
    }
    ctx.restore()
  }

  ctx.strokeStyle = "#F2003C"
  ctx.strokeRect(
    sprite.attackBox.position.x,
    sprite.attackBox.position.y,
    sprite.attackBox.width,
    sprite.attackBox.height
  )
}

export const HandleAttackInvert = (sprite, fighterType, isFacing) => {
  if (fighterType === "rightFacing") {
    if (isFacing === "left") {
      sprite.attackBox.position.x =
        sprite.position.x - sprite.attackBox.offset.x - sprite.attackBox.width
    } else if (isFacing === "right") {
      sprite.attackBox.position.x =
        sprite.position.x + sprite.attackBox.offset.x
    }
  } else if (fighterType === "leftFacing") {
    if (isFacing === "right") {
      sprite.attackBox.position.x =
        sprite.position.x - sprite.attackBox.offset.x - sprite.attackBox.width
    } else if (isFacing === "left") {
      sprite.attackBox.position.x =
        sprite.position.x + sprite.attackBox.offset.x
    }
  }

  sprite.attackBox.position.y = sprite.position.y + sprite.attackBox.offset.y
}
