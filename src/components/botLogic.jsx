const updateBot = (bot, player) => {
    // Implement bot logic here
    
    if (bot.position.x + bot.attackBox.width < player.position.x) {
      // Move the bot right
      bot.velocity.x = 1;
    } else if (bot.position.x - bot.attackBox.width > player.position.x) {
      // Move the bot left
      bot.velocity.x = -1;
    } else {
      // Stop moving if the bot is aligned with the player
      bot.velocity.x = 0;
      // bot.attack();
    }
  
    // Implement attack logic here
    // if (/* condition for bot to attack */) {
    //   bot.attack();
    // }
  };
  
  export default updateBot;
  