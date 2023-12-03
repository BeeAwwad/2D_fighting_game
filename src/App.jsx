import GameCanvas from "./components/GameCanvas"
import playerSprite from "./components/fighters/playerSprite"
import botSprite from "./components/fighters/botSprite"
import { FighterContext } from "./context/FighterContext"
import cloneDeep from "lodash.clonedeep"

function App() {
  console.log("🚀 ~ file: App.jsx:9 ~ App ~ playerSprite:", playerSprite)
  const player = cloneDeep(playerSprite)
  console.log("🚀 ~ file: App.jsx:9 ~ App ~ player:", player)
  const enemy = cloneDeep(botSprite)

  console.log(player === playerSprite)

  return (
    <div className="relative inline-block">
      <FighterContext.Provider value={{ player, enemy }}>
        <GameCanvas />
      </FighterContext.Provider>
    </div>
  )
}

export default App
