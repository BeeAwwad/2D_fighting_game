import { useEffect } from "react"
import Keys from "../keys"

// Hook to handle keyboard and mouse events like left right jump and attack
const useKeyboardMouse = (playerSprite) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "d") {
        Keys.d.pressed = true
        playerSprite.lastKey = "d"
        console.log(playerSprite.lastKey)
        console.log(Keys.d.pressed)
      } else if (e.key === "a") {
        Keys.a.pressed = true
        playerSprite.lastKey = "a"
        console.log(playerSprite.lastKey)
        console.log(Keys.a.pressed)
      } else if (e.key === " ") {
        playerSprite.velocity.y = -18
        Keys.space.pressed = true
        console.log("JUMPED")
        console.log(Keys.space.pressed)
      }
    }

    const handleKeyUp = (e) => {
      if (e.key === "d") {
        Keys.d.pressed = false
      } else if (e.key === "a") {
        Keys.a.pressed = false
      } else if (e.key === " ") {
        Keys.space.pressed = false
      }
    }

    const handleAttack = (e) => {
      if (e.button === 0) {
        playerSprite.attack()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("mousedown", handleAttack)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("mousedown", handleAttack)
    }
  }, [playerSprite])

  return null // Return null or any value as this hook doesn't render anything
}

export default useKeyboardMouse
