import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CrewmateForm from '../components/CrewmateForm'
import { supabase } from '../client'

function CreateCrewmate() {
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleCreate = async ({ name, speed, color, category }) => {
    setBusy(true)
    setError('')
    setSuccess(false)

    const { error: insertError } = await supabase
      .from('crewmates')
      .insert([{ name, speed, color, category }])

    setBusy(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    setSuccess(true)
    setTimeout(() => navigate('/gallery'), 800)
  }

  return (
    <section className="create-page">
      <h1>Create a New Crewmate</h1>
      <CrewmateForm submitLabel="Create Crewmate" onSubmit={handleCreate} busy={busy} />
      {success && <p className="form-message success">Crewmate created! Heading to the gallery...</p>}
      {error && <p className="form-message error">{error}</p>}
    </section>
  )
}

export default CreateCrewmate
