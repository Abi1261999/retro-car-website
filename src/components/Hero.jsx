export default function Hero({ onFindCar }) {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg" />
      <div className="hero__content container">
        <p className="hero__eyebrow">Retro cars 1960–1970</p>
        <h1 className="hero__title">
          Vintage retro
          <br />
          cars USA
        </h1>
        <button type="button" className="btn btn-primary btn-lg" onClick={onFindCar}>
          Find a car
        </button>
      </div>
    </section>
  )
}
