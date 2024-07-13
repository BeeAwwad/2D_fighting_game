export const whoWon = (updatedPlayer, updatedEnemy) => {
  if (updatedPlayer.health === updatedEnemy.health) {
    return "Draw"
  } else if (updatedPlayer.health > updatedEnemy.health) {
    return "You Won!"
  } else if (updatedPlayer.health < updatedEnemy.health) {
    return "You Lost :("
  }
}
