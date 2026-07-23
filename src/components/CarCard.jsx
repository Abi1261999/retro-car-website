export default function CarCard({ car, onRent }) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(car.price)

  return (
    <article className={`car-card ${car.featured ? 'car-card--featured' : ''}`}>
      <div className="car-card__image-wrap">
        <img src={car.image} alt={car.name} className="car-card__image" loading="lazy" />
        {car.featured && <span className="car-card__badge">Featured</span>}
      </div>
      <div className="car-card__body">
        <div className="car-card__price">{formattedPrice}</div>
        <h3 className="car-card__name">{car.name}</h3>
        <div className="car-card__footer">
          <button type="button" className="btn btn-outline btn-sm" onClick={() => onRent(car)}>
            Rent
          </button>
          <span className="car-card__miles">{car.miles}</span>
        </div>
      </div>
    </article>
  )
}
