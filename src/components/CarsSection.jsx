import { useState } from 'react'
import CarCard from './CarCard'
import CarCTACard from './CarCTACard'
import RentCarModal from './RentCarModal'
import { gridCars } from '../data/cars'

export default function CarsSection({ onViewAllCars }) {
  const [rentCar, setRentCar] = useState(null)

  return (
    <section id="cars" className="cars-section">
      <div className="cars-section__inner">
        <div className="cars-grid">
          {gridCars.map((car) => (
            <CarCard key={car.id} car={car} onRent={setRentCar} />
          ))}
          <CarCTACard onAllCars={onViewAllCars} onMoreCars={onViewAllCars} />
        </div>
      </div>

      <RentCarModal car={rentCar} onClose={() => setRentCar(null)} />
    </section>
  )
}
