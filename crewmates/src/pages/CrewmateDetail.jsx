import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CrewmateAvatar from '../components/CrewmateAvatar'
import { DEFAULT_CATEGORY, SLOW_SPEED_THRESHOLD } from '../constants'
import { supabase } from '../client'

function CrewmateDetail() {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const loadCrewmate = async () => {
      setLoading(true)
      setError('')

      const { data, error: fetchError } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single()

      if (cancelled) return

      if (fetchError) {
        setError(fetchError.message)
        setCrewmate(null)
      } else {
        setCrewmate(data)
      }

      setLoading(false)
    }

    loadCrewmate()

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <section className="detail-page">
        <p className="detail-status">Loading crewmate...</p>
      </section>
    )
  }

  if (error || !crewmate) {
    return (
      <section className="detail-page">
        <p className="detail-status error">{error || 'Crewmate not found.'}</p>
        <Link to="/gallery" className="btn btn-secondary">
          Back to Gallery
        </Link>
      </section>
    )
  }

  const createdDate = new Date(crewmate.created_at).toLocaleString()
  const isSlow = Number(crewmate.speed) < SLOW_SPEED_THRESHOLD
  const category = crewmate.category || DEFAULT_CATEGORY

  return (
    <section className="detail-page">
      <h1>Crewmate: {crewmate.name}</h1>
      <CrewmateAvatar color={crewmate.color} size="lg" />

      <div className="detail-stats">
        <h2>Stats:</h2>
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Color:</strong> {crewmate.color}
        </p>
        <p>
          <strong>Speed:</strong> {crewmate.speed} mph
        </p>
        <p>
          <strong>Created:</strong> {createdDate}
        </p>
        {isSlow && (
          <p className="detail-tip">
            This crewmate is kind of slow — maybe give them a boost next time!
          </p>
        )}
        {!isSlow && Number(crewmate.speed) >= 100 && (
          <p className="detail-tip success">
            Wow, this crewmate is blazing fast and ready for any space mission!
          </p>
        )}
      </div>

      <Link to={`/edit/${crewmate.id}`} className="btn btn-secondary">
        Wanna edit this Crewmate?
      </Link>
    </section>
  )
}

export default CrewmateDetail
