export const whoWon = (updatedPlayer, updatedEnemy) => {
  if (updatedPlayer.health === updatedEnemy.health) {
    console.log("Draw")
  } else if (updatedPlayer.health > updatedEnemy.health) {
    console.log("You Won!")
  } else if (updatedPlayer.health < updatedEnemy.health) {
    console.log("You Lost :(")
  }
}
