import { useRef, useEffect, useContext, useMemo } from "react"
import Keys from "../keys"
import { DrawCanvas } from "../drawFunc"
// import updateBot from "../botLogic";
import useKeyboardMouse from "./useKeyboardMouse"
import { FighterContext } from "../../context/FighterContext"
import Sprite from "../sprite"

const useCanvas = () => {
  const { player, setPlayer, enemy, setEnemy } = useContext(FighterContext)

  const ref = useRef(null)
  const updatedPlayer = useMemo(() => {
    const {
      attackBox: { offset },
      ctx,
      lastKey,
      ...playerWithoutOffset
    } = player
    console.log(
      "🚀 ~ file: useCanvas.jsx:20 ~ updatedPlayer ~ lastKey:",
      lastKey
    )

    return new Sprite({ ctx, offset, lastKey, ...playerWithoutOffset })
  }, [player])

  console.log(updatedPlayer)

  useKeyboardMouse(updatedPlayer)

  const update = (ctx) => {
    // Update player logic
    const updatedAttackBox = { ...updatedPlayer.attackBox }

    updatedPlayer.setContext(ctx)
    updatedPlayer.attackBox = updatedAttackBox
    updatedPlayer.update()
    updatedPlayer.velocity.x = 0

    // move player left(a) or right(d)
    if (Keys.a.pressed && updatedPlayer.lastKey === "a") {
      updatedPlayer.velocity.x = -5
    } else if (Keys.d.pressed && updatedPlayer.lastKey === "d") {
      updatedPlayer.velocity.x = 5
    }

    console.log("Keys.a.pressed:", Keys.a.pressed)
    console.log("Keys.d.pressed:", Keys.d.pressed)
    console.log("updatedPlayer.lastKey:", updatedPlayer.lastKey)

    // Other modifications to player can be done here...
    setPlayer(updatedPlayer)

    // Additional update logic for enemy, collisions, etc.
    // updateBot(enemy, player);
  }

  const render = (ctx, cnv) => {
    ctx.clearRect(0, 0, cnv.width, cnv.height) // Clear the canvas
    DrawCanvas(ctx)

    // Render player
    updatedPlayer.render()
    setPlayer(updatedPlayer)
    // Render enemy, other game elements, etc.
    // enemy.render();
  }

  const gameLoop = (ctx, cnv) => {
    update(ctx)
    render(ctx, cnv)
    requestAnimationFrame(() => gameLoop(ctx, cnv))
  }

  // collision statements between attack box and body box
  const rectangularCollision = ({ rectangle1, rectangle2 }) => {
    return (
      rectangle1.position.x +
        rectangle1.attackBox.width +
        rectangle1.attackBox.offset.x >=
        rectangle2.position.x &&
      rectangle1.position.x + rectangle1.attackBox.offset.x <=
        rectangle2.position.x + rectangle2.width &&
      rectangle1.position.y + rectangle1.attackBox.height >=
        rectangle2.position.y &&
      rectangle1.attackBox.position.y <=
        rectangle2.position.y + rectangle2.height
    )
  }

  // this useEffect renders the drawing to the canvas
  useEffect(() => {
    const canvas = ref.current
    if (canvas) {
      const context = canvas.getContext("2d")

      gameLoop(context, canvas)
    }
  }, [])

  return [ref]
}

export default useCanvas
