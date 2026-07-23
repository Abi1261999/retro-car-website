import { useState } from 'react'
import CarCard from './CarCard'
import CarCTACard from './CarCTACard'
import Modal from './Modal'
import ApplicationForm from './ApplicationForm'
import { gridCars, formatPrice } from '../data/cars'

export default function CarsSection() {
  const [rentCar, setRentCar] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const handleAllCars = () => setShowAll(true)
  const handleMoreCars = () => setShowAll(true)

  return (
    <section id="cars" className="cars-section">
      <div className="cars-section__inner">
        <div className="cars-grid">
          {gridCars.map((car) => (
            <CarCard key={car.id} car={car} onRent={setRentCar} />
          ))}
          <CarCTACard onAllCars={handleAllCars} onMoreCars={handleMoreCars} />
        </div>
      </div>

      {showAll && (
        <div className="cars-expanded container">
          <p className="cars-expanded__message">
            Showing full inventory — contact us to rent any vehicle.
          </p>
        </div>
      )}

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
