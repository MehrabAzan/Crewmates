import { COLOR_HEX } from '../constants'

function CrewmateAvatar({ color = 'Red', size = 'md' }) {
  const fill = COLOR_HEX[color] || COLOR_HEX.Red
  const isRainbow = color === 'Rainbow'

  return (
    <div
      className={`crewmate-avatar size-${size}`}
      style={isRainbow ? { background: fill } : { backgroundColor: fill }}
      aria-hidden="true"
    >
      <div className="crewmate-avatar-visor" />
    </div>
  )
}

export default CrewmateAvatar
