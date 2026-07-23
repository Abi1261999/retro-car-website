import { useState } from 'react'
import CarCard from './CarCard'
import Modal from './Modal'
import ApplicationForm from './ApplicationForm'
import { featuredCars, cars, extraCars, formatPrice } from '../data/cars'

export default function CarsSection() {
  const [showAll, setShowAll] = useState(false)
  const [rentCar, setRentCar] = useState(null)

  const moreCars = showAll ? [...cars, ...extraCars] : []

  return (
    <section id="cars" className="cars-section">
      <div className="cars-featured">
        {featuredCars.map((car) => (
          <CarCard key={car.id} car={car} onRent={setRentCar} />
        ))}
      </div>

      {moreCars.length > 0 && (
        <div className="cars-more">
          <div className="cars-more__grid">
            {moreCars.map((car) => (
              <CarCard key={car.id} car={car} onRent={setRentCar} />
            ))}
          </div>
        </div>
      )}

      <div className="cars-actions container">
        <button
          type="button"
          className="btn btn-pill"
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? 'Show less' : 'All cars'}
        </button>
        {!showAll && (
          <button type="button" className="btn btn-link" onClick={() => setShowAll(true)}>
            29 more cars
          </button>
        )}
      </div>

      <Modal
        isOpen={!!rentCar}
        onClose={() => setRentCar(null)}
        title={`Rent ${rentCar?.name ?? ''}`}
      >
        {rentCar && (
          <>
            <p className="modal-car-price">
              {formatPrice(rentCar.price)}
              <span> / day</span>
            </p>
            <ApplicationForm
              onSuccess={() => {
                setTimeout(() => setRentCar(null), 2000)
              }}
            />
          </>
        )}
      </Modal>
    </section>
  )
}
