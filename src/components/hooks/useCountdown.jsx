import { useEffect, useState } from "react"

const useCountdown = (initialTime, callBack, interval = 1000) => {
  const [time, setTime] = useState(initialTime)

  const stop = () => {
    setTime(0)
  }

  useEffect(() => {
    const customInterval = setInterval(() => {
      if (time > 0) {
        setTime((prev) => prev - interval)
      }
    }, interval)

    if (time === 0) {
      callBack()
    }

    // Cleanup function to clear interval on unmount or when stopped
    return () => clearInterval(customInterval)
  }, [time, interval, callBack])

  return { time, stop }
}

export default useCountdown
