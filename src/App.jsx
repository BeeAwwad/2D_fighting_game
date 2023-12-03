import GameCanvas from "./components/GameCanvas"
import playerSprite from "./components/fighters/playerSprite"
import botSprite from "./components/fighters/botSprite"
import { FighterContext } from "./context/FighterContext"
import cloneDeep from "lodash.clonedeep"

function App() {
  const player = cloneDeep(playerSprite)
  const enemy = cloneDeep(botSprite)

  return (
    <div className="relative inline-block">
      <FighterContext.Provider value={{ player, enemy }}>
        <GameCanvas />
      </FighterContext.Provider>
    </div>
  )
}

export default App
