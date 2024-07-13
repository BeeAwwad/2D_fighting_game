import PropTypes from "prop-types"

export const MatchResult = ({ fightResults }) => {
  return (
    <div className="absolute text-white flex items-center justify-center top-0 bottom-0 right-0 left-0">
      <span>{fightResults}</span>
    </div>
  )
}

MatchResult.propTypes = {
  fightResults: PropTypes.string,
}
