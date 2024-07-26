import { useEffect, useRef, useState } from "react"
import Keys from "../gameObjects/keys"
import { DrawCanvas } from "../functions/drawFunc"
import { whoWon } from "../functions/whoWon"
import botBehaviour from "../functions/botBehaviour"
import { rectangularCollision } from "../functions/rectangularCollision"
import useKeyboardMouse from "./useKeyboardMouse"

import {
  botSprite,
  playerSprite,
  backgroundSprite,
  shopSprite,
} from "../gameSprites/gameSprites"
import useCountdown from "./useCountdown"
const useBetterGame = () => {
  const ref = useRef(null)
  const playerRef = useRef(playerSprite)
  const enemyRef = useRef(botSprite)
  const [playerHealth, setPlayerHealth] = useState(100)
  const [enemyHealth, setEnemyHealth] = useState(100)
  const [fightResult, setFightRelsuts] = useState("")
  const [stopCountdown, setStopCountdown] = useState(false)
  const { time } = useCountdown(
    15,
    () => {
      setFightRelsuts(whoWon(playerRef.current, enemyRef.current))
    },
    stopCountdown
  )

  useKeyboardMouse(playerRef.current)

  const update = (ctx) => {
    // Update player logic
    backgroundSprite.setContext(ctx)
    shopSprite.setContext(ctx)
    playerRef.current.setContext(ctx)
    enemyRef.current.setContext(ctx)

    playerRef.current.update()
    enemyRef.current.update()

    // fighter movement logic
    playerRef.current.velocity.x = 0

    if (Keys.a.pressed && playerRef.current.lastKey === "a") {
      playerRef.current.velocity.x = -3
      playerRef.current.switchSprites("run")
    } else if (Keys.d.pressed && playerRef.current.lastKey === "d") {
      playerRef.current.velocity.x = 3
      playerRef.current.switchSprites("run")
    } else {
      playerRef.current.switchSprites("idle")
    }

    if (playerRef.current.velocity.y < 0) {
      playerRef.current.switchSprites("jump")
    } else if (playerRef.current.velocity.y > 0) {
      playerRef.current.switchSprites("fall")
    }
    // Bot behavior
    botBehaviour(enemyRef.current, playerRef.current)

    // detect successful player attack
    if (
      rectangularCollision({
        rectangle1: playerRef.current,
        rectangle2: enemyRef.current,
      }) &&
      playerRef.current.isAttacking &&
      playerRef.current.frameCurrent === 4
    ) {
      playerRef.current.isAttacking = false
      enemyRef.current.takeHit()
      setEnemyHealth(enemyRef.current.health)
    }

    // change player isAttacking back to false
    if (playerRef.current.isAttacking && playerRef.current.frameCurrent === 4) {
      playerRef.current.isAttacking = false
    }

    // detect successful enemy attack
    if (
      rectangularCollision({
        rectangle1: enemyRef.current,
        rectangle2: playerRef.current,
      }) &&
      enemyRef.current.isAttacking &&
      enemyRef.current.frameCurrent === 2
    ) {
      enemyRef.current.isAttacking = false
      playerRef.current.takeHit()
      setPlayerHealth(playerRef.current.health)
    }
  }

  // change enemy isAttacking back to false
  if (enemyRef.current.isAttacking && enemyRef.current.frameCurrent === 2) {
    enemyRef.current.isAttacking = false
  }

  const render = (ctx, cnv) => {
    ctx.clearRect(0, 0, cnv.width, cnv.height)
    DrawCanvas(ctx)

    //render images
    backgroundSprite.render()
    shopSprite.render()
    playerRef.current.render()
    enemyRef.current.render()
  }

  const gameLoop = (ctx, cnv) => {
    update(ctx)
    render(ctx, cnv)
    requestAnimationFrame(() => gameLoop(ctx, cnv))
  }

  useEffect(() => {
    const canvas = ref.current
    if (canvas) {
      const context = canvas.getContext("2d")
      gameLoop(context, canvas)
    }
  }, [])

  useEffect(() => {
    if (playerHealth <= 0 || enemyHealth <= 0) {
      setFightRelsuts(whoWon(playerRef.current, enemyRef.current))
      setStopCountdown(true)
    }
  }, [playerHealth, enemyHealth])

  return [
    ref,
    playerRef.current,
    enemyRef.current,
    time,
    fightResult,
    playerHealth,
    enemyHealth,
  ]
}

export default useBetterGame
