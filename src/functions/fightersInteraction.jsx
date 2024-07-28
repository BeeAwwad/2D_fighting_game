// collision statements between attack box and body box
export const rectangularCollision = ({ rectangle1, rectangle2 }) => {
  return (
    rectangle1.position.x +
      rectangle1.attackBox.width +
      rectangle1.attackBox.offset.x >=
      rectangle2.position.x &&
    rectangle1.position.x + rectangle1.attackBox.offset.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

export const isPlayerFacingEnemy = (player, enemy) => {
  if (
    enemy.position.x + enemy.imageOffset.x >
    player.position.x + player.imageOffset.x
  ) {
    player.isFacing = "right"
    enemy.isFacing = "left"
  } else if (
    player.position.x + player.imageOffset.x >
    enemy.position.x + enemy.imageOffset.x
  ) {
    player.isFacing = "left"
    enemy.isFacing = "right"
  }
}
