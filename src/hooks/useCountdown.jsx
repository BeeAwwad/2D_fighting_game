import { useEffect, useState } from "react"

const useCountdown = (initialTime, callBack, interval = 1000) => {
  const [time, setTime] = useState(initialTime)

  const stop = () => {
    setTime(0)
  }

  useEffect(() => {
    const customInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1
        } else {
          stop()
          callBack()
          return 0
        }
      })
    }, interval)

    return () => clearInterval(customInterval)
  }, [interval, callBack])

  return { time }
}

export default useCountdown
