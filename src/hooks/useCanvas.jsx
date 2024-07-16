import { useRef, useEffect, useMemo, useState } from "react"
import Keys from "../gameObjects/keys"
import { DrawCanvas } from "../functions/drawFunc"
import { whoWon } from "../functions/whoWon"
import updateBot from "../functions/botLogic"
import { rectangularCollision } from "../functions/rectangularCollision"
import useKeyboardMouse from "./useKeyboardMouse"
import { Fighter } from "../functions/sprite"
import cloneDeep from "lodash.clonedeep"
import {
  botSprite,
  playerSprite,
  backgroundSprite,
} from "../gameSprites/gameSprites"
import useCountdown from "./useCountdown"

const useCanvas = () => {
  const player = cloneDeep(playerSprite)
  const enemy = cloneDeep(botSprite)
  const [currentPlayer, setCurrentPlayer] = useState(player)
  const [currentEnemy, setCurrentEnemy] = useState(enemy)
  const [playerHealth, setPlayerHealth] = useState(100)
  const [enemyHealth, setEnemyHealth] = useState(100)
  const [fightResults, setFightResults] = useState(null)
  const [stopCountdown, setStopCountdown] = useState(false)

  const ref = useRef(null)

  // Player
  const updatedPlayer = useMemo(() => {
    const {
      attackBox: { offset },
      ctx,
      lastKey,
      ...playerWithoutOffset
    } = currentPlayer

    return new Fighter({ ctx, offset, lastKey, ...playerWithoutOffset })
  }, [currentPlayer])

  useKeyboardMouse(updatedPlayer)

  // Enemy
  const updatedEnemy = useMemo(() => {
    const {
      attackBox: { offset },
      ctx,
      lastKey,
      ...enemyrWithoutOffset
    } = currentEnemy

    return new Fighter({ ctx, offset, lastKey, ...enemyrWithoutOffset })
  }, [currentEnemy])

  const { time } = useCountdown(
    15,
    () => {
      setFightResults(whoWon(currentPlayer, currentEnemy))
    },
    stopCountdown
  )

  const update = (ctx) => {
    // Update player logic
    const updatedAttackBox = { ...updatedPlayer.attackBox }
    backgroundSprite.setContext(ctx)
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

    setCurrentPlayer(updatedPlayer)

    // Bot behavioirs
    updateBot(updatedEnemy, updatedPlayer)

    // detect successful attack
    if (
      rectangularCollision({
        rectangle1: updatedPlayer,
        rectangle2: updatedEnemy,
      }) &&
      updatedPlayer.isAttacking
    ) {
      updatedPlayer.isAttacking = false
      updatedEnemy.health = Math.max(updatedEnemy.health - 10, 0)
      setEnemyHealth(updatedEnemy.health)
      setCurrentEnemy(updatedEnemy)
    }

    // detect successful enemy attack
    if (
      rectangularCollision({
        rectangle1: updatedEnemy,
        rectangle2: updatedPlayer,
      }) &&
      updatedEnemy.isAttacking
    ) {
      updatedEnemy.isAttacking = false
      updatedPlayer.health = Math.max(updatedPlayer.health - 10, 0)
      setPlayerHealth(updatedPlayer.health)
      setCurrentPlayer(updatedPlayer)
    }
  }

  const render = (ctx, cnv) => {
    ctx.clearRect(0, 0, cnv.width, cnv.height) // Clear the canvas
    DrawCanvas(ctx)

    //render background
    backgroundSprite.render()

    // Render player
    updatedPlayer.render()
    updatedEnemy.render()
    setCurrentPlayer(updatedPlayer)
    setCurrentEnemy(updatedEnemy)
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

  useEffect(() => {
    if (playerHealth <= 0 || enemyHealth <= 0) {
      setFightResults(whoWon(currentPlayer, currentEnemy))
      setStopCountdown(true)
    }
  }, [playerHealth, enemyHealth, currentPlayer, currentEnemy])

  return [
    ref,
    currentPlayer,
    currentEnemy,
    time,
    fightResults,
    playerHealth,
    enemyHealth,
  ]
}

export default useCanvas
