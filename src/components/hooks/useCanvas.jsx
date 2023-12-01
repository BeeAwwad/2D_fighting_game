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

  // Player
  const updatedPlayer = useMemo(() => {
    const {
      attackBox: { offset },
      ctx,
      lastKey,
      ...playerWithoutOffset
    } = player

    return new Sprite({ ctx, offset, lastKey, ...playerWithoutOffset })
  }, [player])
  // console.log(
  //   "🚀 ~ file: useCanvas.jsx:29 ~ updatedPlayer ~ updatedPlayer:",
  //   updatedPlayer
  // )

  useKeyboardMouse(updatedPlayer)

  // Enemy
  const updatedEnemy = useMemo(() => {
    const {
      attackBox: { offset },
      ctx,
      lastKey,
      ...enemyrWithoutOffset
    } = enemy

    return new Sprite({ ctx, offset, lastKey, ...enemyrWithoutOffset })
  }, [enemy])

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

  const update = (ctx) => {
    // Update player logic
    const updatedAttackBox = { ...updatedPlayer.attackBox }

    updatedPlayer.setContext(ctx)
    updatedEnemy.setContext(ctx)
    updatedPlayer.attackBox = updatedAttackBox
    updatedPlayer.update()
    updatedEnemy.update()
    updatedPlayer.velocity.x = 0

    // move player left(a) or right(d)
    if (Keys.a.pressed && updatedPlayer.lastKey === "a") {
      updatedPlayer.velocity.x = -4
    } else if (Keys.d.pressed && updatedPlayer.lastKey === "d") {
      updatedPlayer.velocity.x = 4
    }

    // Other modifications to player can be done here...
    setPlayer(updatedPlayer)

    // Additional update logic for enemy, collisions, etc.

    // detect successful attack
    if (
      rectangularCollision({
        rectangle1: updatedPlayer,
        rectangle2: updatedEnemy,
      }) &&
      updatedPlayer.isAttacking
    ) {
      console.log("Jab!")

      let updatedEnemyWithReducedHealth = {
        ...updatedEnemy,
        health: Math.max(updatedEnemy.health - 10, 0),
      }
      console.log("Enemy health is ", updatedEnemyWithReducedHealth.health)
      setEnemy(updatedEnemyWithReducedHealth)
    }

    if (
      rectangularCollision({
        rectangle1: updatedEnemy,
        rectangle2: updatedPlayer,
      }) &&
      updatedEnemy.isAttacking
    ) {
      console.log("I have been hit!")
    }

    // updateBot(enemy, player);
  }

  const render = (ctx, cnv) => {
    ctx.clearRect(0, 0, cnv.width, cnv.height) // Clear the canvas
    DrawCanvas(ctx)

    // Render player
    updatedPlayer.render()
    updatedEnemy.render()
    setPlayer(updatedPlayer)
    setEnemy(updatedEnemy)
    // Render enemy, other game elements, etc.
    // enemy.render();
  }

  const gameLoop = (ctx, cnv) => {
    update(ctx)
    render(ctx, cnv)
    requestAnimationFrame(() => gameLoop(ctx, cnv))
  }

  // this useEffect renders the drawing to the canvas
  useEffect(() => {
    const canvas = ref.current
    if (canvas) {
      const context = canvas.getContext("2d")

      gameLoop(context, canvas)
    }
  }, [])

  return [ref, updatedPlayer, updatedEnemy]
}

export default useCanvas
