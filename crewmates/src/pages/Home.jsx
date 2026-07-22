import CrewmateAvatar from '../components/CrewmateAvatar'

function Home() {
  return (
    <section className="home-page">
      <h1>Welcome to the Crewmate Creator!</h1>
      <p className="home-subtitle">
        Here is where you can create your very own set of crewmates before sending them off into space!
      </p>
      <div className="home-art">
        <div className="home-crew-row">
          <CrewmateAvatar color="Red" size="md" />
          <CrewmateAvatar color="Blue" size="md" />
          <CrewmateAvatar color="Green" size="md" />
          <CrewmateAvatar color="Pink" size="md" />
          <CrewmateAvatar color="Orange" size="md" />
        </div>
        <div className="ufo" aria-hidden="true">
          <div className="ufo-dome" />
          <div className="ufo-body" />
          <div className="ufo-beam" />
        </div>
      </div>
    </section>
  )
}

export default Home
