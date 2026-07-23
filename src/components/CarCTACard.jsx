import { carImages } from '../data/cars'
import { ArrowUpRight } from './ArrowUpRight'

export default function CarCTACard({ onAllCars, onMoreCars }) {
  return (
    <article className="car-card car-card--cta">
      {carImages.cta && (
        <img
          src={carImages.cta}
          alt=""
          className="car-card__cta-car"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      )}
      <div className="car-card__overlay car-card__overlay--cta">
        <div className="car-card__actions">
          <button type="button" className="btn btn-rent" onClick={onAllCars}>
            All cars
            <ArrowUpRight />
          </button>
          <button type="button" className="btn btn-miles" onClick={onMoreCars}>
            29 more cars
          </button>
        </div>
      </div>
    </article>
  )
}
