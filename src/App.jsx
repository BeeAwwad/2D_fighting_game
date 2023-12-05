import GameCanvas from "./components/GameCanvas"
import playerSprite from "./components/fighters/playerSprite"
import botSprite from "./components/fighters/botSprite"
import cloneDeep from "lodash.clonedeep"

function App() {
  const player = cloneDeep(playerSprite)
  const enemy = cloneDeep(botSprite)

  return (
    <div className="relative inline-block">
      <GameCanvas player={player} enemy={enemy} />
    </div>
  )
}

export default App
