import GameCanvas from "./components/GameCanvas";
import { useState } from "react";
import playerSprite from "./components/fighters/playerSprite";
import botSprite from "./components/fighters/botSprite";
import { FighterContext } from "./context/FighterContext";

function App() {
  const [player, setPlayer] = useState(() => playerSprite);
  const [enemy, setEnemy] = useState(() => botSprite);

  return (
    <div className="relative inline-block">
      <FighterContext.Provider value={{ player, setPlayer, enemy, setEnemy }}>
        <GameCanvas />
      </FighterContext.Provider>
    </div>
  );
}

export default App;
