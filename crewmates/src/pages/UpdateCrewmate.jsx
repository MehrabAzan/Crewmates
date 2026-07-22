import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CrewmateForm from '../components/CrewmateForm'
import { DEFAULT_CATEGORY } from '../constants'
import { supabase } from '../client'

function UpdateCrewmate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [crewmate, setCrewmate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

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

  const handleUpdate = async ({ name, speed, color, category }) => {
    setBusy(true)
    setError('')
    setMessage('')

    const { data, error: updateError } = await supabase
      .from('crewmates')
      .update({ name, speed, color, category })
      .eq('id', id)
      .select()
      .single()

    setBusy(false)

    if (updateError) {
      setError(updateError.message)
      return
    }

    setCrewmate(data)
    setMessage('Crewmate updated!')
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete ${crewmate?.name || 'this crewmate'}? This cannot be undone.`)
    if (!confirmed) return

    setBusy(true)
    setError('')

    const { error: deleteError } = await supabase.from('crewmates').delete().eq('id', id)

    setBusy(false)

    if (deleteError) {
      setError(deleteError.message)
      return
    }

    navigate('/gallery')
  }

  if (loading) {
    return (
      <section className="update-page">
        <p className="update-status">Loading crewmate...</p>
      </section>
    )
  }

  if (!crewmate) {
    return (
      <section className="update-page">
        <p className="update-status error">{error || 'Crewmate not found.'}</p>
        <Link to="/gallery" className="btn btn-secondary">
          Back to Gallery
        </Link>
      </section>
    )
  }

  const category = crewmate.category || DEFAULT_CATEGORY

  return (
    <section className="update-page">
      <h1>Update Your Crewmate :)</h1>
      <p className="current-info">
        Current Crewmate Info:
        <br />
        Name: {crewmate.name}, Category: {category}, Speed: {crewmate.speed}, Color:{' '}
        {crewmate.color}
      </p>

      <CrewmateForm
        key={`${crewmate.id}-${crewmate.name}-${crewmate.speed}-${crewmate.color}-${category}`}
        initialName={crewmate.name}
        initialSpeed={crewmate.speed}
        initialColor={crewmate.color}
        initialCategory={category}
        submitLabel="Update Crewmate"
        onSubmit={handleUpdate}
        onDelete={handleDelete}
        busy={busy}
      />

      {message && <p className="form-message success">{message}</p>}
      {error && <p className="form-message error">{error}</p>}
    </section>
  )
}

export default UpdateCrewmate
