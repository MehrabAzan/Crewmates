import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CrewmateAvatar from '../components/CrewmateAvatar'
import { COLOR_HEX, DEFAULT_CATEGORY } from '../constants'
import { computeCrewStats, computeMissionReadiness } from '../crewStats'
import { supabase } from '../client'

function Gallery() {
  const [crewmates, setCrewmates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const loadCrewmates = async () => {
      setLoading(true)
      setError('')

      const { data, error: fetchError } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false })

      if (cancelled) return

      if (fetchError) {
        setError(fetchError.message)
        setCrewmates([])
      } else {
        setCrewmates(data || [])
      }

      setLoading(false)
    }

    loadCrewmates()

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <section className="gallery-page">
        <h1>Your Crewmate Gallery!</h1>
        <p className="gallery-status">Loading crewmates...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="gallery-page">
        <h1>Your Crewmate Gallery!</h1>
        <p className="gallery-status error">{error}</p>
      </section>
    )
  }

  if (crewmates.length === 0) {
    return (
      <section className="gallery-page">
        <h1>Your Crewmate Gallery!</h1>
        <div className="empty-state">
          <p>You haven't made a crewmate yet!</p>
          <Link to="/create" className="create-link">
            Create one here!
          </Link>
        </div>
      </section>
    )
  }

  const stats = computeCrewStats(crewmates)
  const readiness = computeMissionReadiness(crewmates)

  return (
    <section className={`gallery-page success-${readiness.level}`}>
      <h1>Your Crewmate Gallery!</h1>

      <div className={`mission-banner success-${readiness.level}`}>
        <p className="mission-score">Mission Readiness: {readiness.score}%</p>
        <p className="mission-label">{readiness.label}</p>
      </div>

      <div className="crew-stats">
        <h2>Crew Stats</h2>
        <div className="crew-stats-grid">
          <div className="stat-block">
            <h3>Average Speed</h3>
            <p>{stats.averageSpeed} mph</p>
          </div>
          <div className="stat-block">
            <h3>Impostors</h3>
            <p>{stats.impostorPercent}%</p>
          </div>
          <div className="stat-block">
            <h3>By Category</h3>
            <ul>
              {Object.entries(stats.categoryPercents).map(([category, percent]) => (
                <li key={category}>
                  {category}: {percent}% ({stats.categoryCounts[category] || 0})
                </li>
              ))}
            </ul>
          </div>
          <div className="stat-block">
            <h3>By Color</h3>
            <ul>
              {Object.entries(stats.colorPercents).map(([color, percent]) => (
                <li key={color}>
                  {color}: {percent}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={`gallery-grid success-${readiness.level}`}>
        {crewmates.map((crewmate) => {
          const glow = COLOR_HEX[crewmate.color] || '#fff'
          const isRainbow = crewmate.color === 'Rainbow'
          const category = crewmate.category || DEFAULT_CATEGORY

          return (
            <article
              key={crewmate.id}
              className={`gallery-card success-${readiness.level}`}
              style={{
                boxShadow: isRainbow
                  ? '0 0 22px rgba(255, 140, 200, 0.65), 0 0 8px rgba(126, 200, 255, 0.5)'
                  : `0 0 22px ${glow}99, 0 0 6px ${glow}`,
                borderColor: isRainbow ? '#ed54ba' : glow,
              }}
            >
              <Link to={`/crewmate/${crewmate.id}`} className="gallery-card-link">
                <CrewmateAvatar color={crewmate.color} size="sm" />
                <div className="gallery-card-info">
                  <h2>Name of Crewmate: {crewmate.name}</h2>
                  <p>Category: {category}</p>
                  <p>Speed of Crewmate: {crewmate.speed} mph</p>
                  <p>Color of Crewmate: {crewmate.color}</p>
                </div>
              </Link>
              <Link to={`/edit/${crewmate.id}`} className="btn btn-edit">
                Edit Crewmate
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Gallery
