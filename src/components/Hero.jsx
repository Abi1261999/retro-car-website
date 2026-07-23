import { ArrowUpRight } from './ArrowUpRight'

export default function Hero({ onFindCar }) {
  return (
    <section id="hero" className="hero">
      <div className="hero__inner container">
        <h1 className="hero__title">Retro cars 1960-1970</h1>
        <div className="hero__row">
          <p className="hero__subtitle">Vintage retro cars USA</p>
          <button type="button" className="btn btn-pill" onClick={onFindCar}>
            Find a car
            <ArrowUpRight />
          </button>
        </div>
      </div>
    </section>
  )
}
