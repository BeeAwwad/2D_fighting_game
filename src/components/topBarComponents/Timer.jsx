import PropTypes from "prop-types"

function Timer({ time }) {
  return (
    <div className="bg-violet-500 h-24 w-24 shrink-0 flex justify-center items-center">
      {time}
    </div>
  )
}

Timer.propTypes = {
  time: PropTypes.number,
}

export default Timer
