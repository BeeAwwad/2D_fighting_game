import { useEffect, useState } from "react"

const useCountdown = (initialTime, callBack, stop, interval = 1000) => {
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    if (stop) return

    const customInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1
        } else {
          clearInterval(customInterval)
          callBack()
          return 0
        }
      })
    }, interval)

    return () => clearInterval(customInterval)
  }, [interval, callBack, stop])

  return { time }
}

export default useCountdown
