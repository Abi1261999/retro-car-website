import { useState } from 'react'
import CarCard from './CarCard'
import Modal from './Modal'
import ApplicationForm from './ApplicationForm'
import { cars, extraCars } from '../data/cars'

export default function CarsSection() {
  const [showAll, setShowAll] = useState(false)
  const [rentCar, setRentCar] = useState(null)

  const displayedCars = showAll ? [...cars, ...extraCars] : cars

  return (
    <section id="cars" className="cars-section section">
      <div className="container">
        <div className="cars-grid">
          {displayedCars.map((car) => (
            <CarCard key={car.id} car={car} onRent={setRentCar} />
          ))}
        </div>

        <div className="cars-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? 'Show less' : 'All cars'}
          </button>
          {!showAll && (
            <button
              type="button"
              className="btn btn-text"
              onClick={() => setShowAll(true)}
            >
              29 more cars
            </button>
          )}
        </div>
      </div>

      <Modal
        isOpen={!!rentCar}
        onClose={() => setRentCar(null)}
        title={`Rent ${rentCar?.name ?? ''}`}
      >
        {rentCar && (
          <>
            <p className="modal-car-price">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(rentCar.price)}
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
