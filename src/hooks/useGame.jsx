import { useEffect, useRef, useState, useCallback } from "react"
import Keys from "../gameObjects/keys"
import { DrawCanvas } from "../functions/drawFunc"
import { whoWon } from "../functions/whoWon"
// import botBehaviour from "../functions/botBehaviour"
import {
  rectangularCollision,
  isPlayerFacingEnemy,
} from "../functions/fightersInteraction"
import useKeyboardMouse from "./useKeyboardMouse"

import {
  botSprite,
  playerSprite,
  backgroundSprite,
  shopSprite,
  SystemFps,
} from "../gameSprites/gameSprites"
import useCountdown from "./useCountdown"

const useGame = () => {
  const ref = useRef(null)
  const playerRef = useRef(playerSprite)
  const enemyRef = useRef(botSprite)
  const [playerHealth, setPlayerHealth] = useState(100)
  const [enemyHealth, setEnemyHealth] = useState(100)
  const [fightResult, setFightResults] = useState("")
  const [stopCountdown, setStopCountdown] = useState(false)
  const { time } = useCountdown(
    15,
    () => {
      setFightResults(whoWon(playerRef.current, enemyRef.current))
    },
    stopCountdown
  )

  useKeyboardMouse(playerRef.current)

  const update = (ctx, secondsPassed) => {
    backgroundSprite.setContext(ctx)
    shopSprite.setContext(ctx)
    SystemFps.setContext(ctx)
    playerRef.current.setContext(ctx)
    enemyRef.current.setContext(ctx)

    playerRef.current.update(secondsPassed)
    enemyRef.current.update(secondsPassed)
    SystemFps.update(secondsPassed)

    playerRef.current.velocity.x = 0
    enemyRef.current.velocity.x = 0

    if (Keys.a.pressed && playerRef.current.lastKey === "a") {
      playerRef.current.velocity.x = -260
      playerRef.current.switchSprites("run")
    } else if (Keys.d.pressed && playerRef.current.lastKey === "d") {
      playerRef.current.velocity.x = 260
      playerRef.current.switchSprites("run")
    } else {
      playerRef.current.switchSprites("idle")
    }

    if (playerRef.current.velocity.y < 0) {
      playerRef.current.switchSprites("jump")
    } else if (playerRef.current.velocity.y > 0) {
      playerRef.current.switchSprites("fall")
    }

    if (enemyRef.current.velocity.y < 0) {
      enemyRef.current.switchSprites("jump")
    } else if (enemyRef.current.velocity.y > 0) {
      enemyRef.current.switchSprites("fall")
    } else {
      enemyRef.current.switchSprites("idle")
    }

    isPlayerFacingEnemy(playerRef.current, enemyRef.current)

    // Detect successful player attack
    if (
      rectangularCollision({
        rectangle1: playerRef.current,
        rectangle2: enemyRef.current,
      }) &&
      playerRef.current.isAttacking &&
      playerRef.current.framesCurrent === 4
    ) {
      playerRef.current.isAttacking = false
      enemyRef.current.takeHit()
      setEnemyHealth(enemyRef.current.health)
    }

    if (
      playerRef.current.isAttacking &&
      playerRef.current.framesCurrent === 4
    ) {
      playerRef.current.isAttacking = false
    }

    if (
      rectangularCollision({
        rectangle1: enemyRef.current,
        rectangle2: playerRef.current,
      }) &&
      enemyRef.current.isAttacking &&
      enemyRef.current.framesCurrent === 2
    ) {
      enemyRef.current.isAttacking = false
      playerRef.current.takeHit()
      setPlayerHealth(playerRef.current.health)
    }

    if (enemyRef.current.isAttacking && enemyRef.current.framesCurrent === 2) {
      enemyRef.current.isAttacking = false
    }

    // Bot behavior
    // botBehaviour(enemyRef.current, playerRef.current)
  }

  const render = (ctx, cnv) => {
    ctx.clearRect(0, 0, cnv.width, cnv.height)
    DrawCanvas(ctx)

    // render images
    backgroundSprite.render()
    // shopSprite.render()
    playerRef.current.render()
    enemyRef.current.render()
    SystemFps.render()
  }

  let previousTime = 0
  let secondsPassed = 0

  const gameLoop = useCallback((timeStamp) => {
    secondsPassed = (timeStamp - previousTime) / 1000
    secondsPassed = secondsPassed <= 0 ? 0.001 : secondsPassed
    previousTime = timeStamp

    const canvas = ref.current
    if (canvas) {
      const context = canvas.getContext("2d")
      update(context, secondsPassed)
      render(context, canvas)
    }
    requestAnimationFrame(gameLoop)
  }, [])

  useEffect(() => {
    const canvas = ref.current
    let animationFrameId

    animationFrameId = canvas ? requestAnimationFrame(gameLoop) : undefined

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [gameLoop])

  useEffect(() => {
    if (playerHealth <= 0 || enemyHealth <= 0) {
      setFightResults(whoWon(playerRef.current, enemyRef.current))
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

export default useGame
