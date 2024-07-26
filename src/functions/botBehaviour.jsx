const botBehaviour = (bot, player) => {
  // Check if the player is within the attack range of the bot
  const playerInRange =
    player.position.x + player.width > bot.attackBox.position.x &&
    player.position.x < bot.attackBox.position.x + bot.attackBox.width &&
    player.position.y + player.height > bot.attackBox.position.y &&
    player.position.y < bot.attackBox.position.y + bot.attackBox.height

  // Implement bot logic here
  if (player.health <= 0) {
    bot.isAttacking = false
    bot.switchSprites("idle")
    return
  }

  if (playerInRange) {
    // If the player is within range, attack
    bot.velocity.x = 0
    bot.switchSprites("idle")
    if (!bot.isAttacking && !bot.attackCooldown) {
      bot.attack()
      bot.attackCooldown = true
      bot.attackCooldownEndTime = Date.now() + bot.attackCooldownTime
    }
  } else if (bot.position.x + bot.attackBox.width < player.position.x) {
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
  }
}

export default botBehaviour
