import { useEffect, useState } from 'react'
import {
  CATEGORY_ATTRIBUTES,
  CATEGORY_OPTIONS,
  DEFAULT_CATEGORY,
} from '../constants'

function CrewmateForm({
  initialName = '',
  initialSpeed = '',
  initialColor = '',
  initialCategory = DEFAULT_CATEGORY,
  submitLabel = 'Create Crewmate',
  onSubmit,
  onDelete,
  busy = false,
}) {
  const [name, setName] = useState(initialName)
  const [category, setCategory] = useState(initialCategory || DEFAULT_CATEGORY)
  const allowedColors = CATEGORY_ATTRIBUTES[category]?.colors || []
  const allowedSpeeds = CATEGORY_ATTRIBUTES[category]?.speeds || []

  const resolveColor = (nextCategory, preferred) => {
    const colors = CATEGORY_ATTRIBUTES[nextCategory]?.colors || []
    if (preferred && colors.includes(preferred)) return preferred
    return colors[0] || ''
  }

  const resolveSpeed = (nextCategory, preferred) => {
    const speeds = CATEGORY_ATTRIBUTES[nextCategory]?.speeds || []
    const preferredNum = Number(preferred)
    if (preferred !== '' && !Number.isNaN(preferredNum) && speeds.includes(preferredNum)) {
      return preferredNum
    }
    return speeds[0] ?? ''
  }

  const [color, setColor] = useState(() =>
    resolveColor(initialCategory || DEFAULT_CATEGORY, initialColor)
  )
  const [speed, setSpeed] = useState(() =>
    resolveSpeed(initialCategory || DEFAULT_CATEGORY, initialSpeed)
  )

  useEffect(() => {
    setColor((current) => resolveColor(category, current))
    setSpeed((current) => resolveSpeed(category, current))
  }, [category])

  const handleCategoryChange = (nextCategory) => {
    setCategory(nextCategory)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({
      name: name.trim(),
      speed: Number(speed),
      color,
      category,
    })
  }

  return (
    <form className="crewmate-form" onSubmit={handleSubmit}>
      <div className="form-card">
        <span className="form-label">Category:</span>
        <div className="attribute-options" role="radiogroup" aria-label="Crewmate category">
          {CATEGORY_OPTIONS.map((option) => (
            <label key={option} className="attribute-option">
              <input
                type="radio"
                name="category"
                value={option}
                checked={category === option}
                onChange={() => handleCategoryChange(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <p className="form-hint">
          {category === 'Impostor' && 'Impostors get faster speeds and darker colors.'}
          {category === 'Engineer' && 'Engineers stick to tech colors and mid-range speeds.'}
          {category === 'Crewmate' && 'Crewmates can use most colors and standard speeds.'}
        </p>
      </div>

      <div className="form-card">
        <label htmlFor="crewmate-name">Name:</label>
        <input
          id="crewmate-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter crewmate name"
          required
        />
      </div>

      <div className="form-card">
        <span className="form-label">Speed (mph):</span>
        <div className="attribute-options" role="radiogroup" aria-label="Crewmate speed">
          {allowedSpeeds.map((option) => (
            <label key={option} className="attribute-option">
              <input
                type="radio"
                name="speed"
                value={option}
                checked={Number(speed) === option}
                onChange={() => setSpeed(option)}
              />
              <span>{option} mph</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-card">
        <span className="form-label">Color:</span>
        <div className="attribute-options" role="radiogroup" aria-label="Crewmate color">
          {allowedColors.map((option) => (
            <label key={option} className="attribute-option">
              <input
                type="radio"
                name="color"
                value={option}
                checked={color === option}
                onChange={() => setColor(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? 'Saving...' : submitLabel}
        </button>
        {onDelete && (
          <button type="button" className="btn btn-danger" onClick={onDelete} disabled={busy}>
            Delete Crewmate
          </button>
        )}
      </div>
    </form>
  )
}

export default CrewmateForm
