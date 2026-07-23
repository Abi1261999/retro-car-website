import { formatPrice } from '../data/cars'
import { ArrowUpRight } from './ArrowUpRight'

export default function CarCard({ car, onRent }) {
  return (
    <article className="car-card car-card--overlay">
      <img src={car.image} alt={car.name} className="car-card__bg" loading="lazy" />
      <div className="car-card__gradient" />
      <div className="car-card__overlay">
        <p className="car-card__price">{formatPrice(car.price)}</p>
        <h3 className="car-card__name">{car.name}</h3>
        <div className="car-card__actions">
          <button type="button" className="btn btn-rent" onClick={() => onRent(car)}>
            Rent
            <ArrowUpRight />
          </button>
          <span className="car-card__miles">{car.miles}</span>
        </div>
      </div>
    </article>
  )
}
