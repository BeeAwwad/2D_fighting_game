const botBehaviour = (bot, player) => {
  // Implement bot logic here

  if (bot.position.x + bot.attackBox.width < player.position.x) {
    // Move the bot right
    bot.velocity.x = 1
    bot.switchSprites("run")
  } else if (bot.position.x - bot.attackBox.width > player.position.x) {
    // Move the bot left
    bot.velocity.x = -1
    bot.switchSprites("run")
  } else {
    // Stop moving if the bot is aligned with the player
    bot.velocity.x = 0
    bot.switchSprites("idle")
    // bot.attack()
  }
}

export default botBehaviour
