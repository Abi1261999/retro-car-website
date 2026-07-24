import { useState } from 'react'
import CarCard from './CarCard'
import CarCTACard from './CarCTACard'
import { gridCars } from '../data/cars'
import { useSiteNavigation } from '../hooks/useSiteNavigation'

export default function CarsSection({ onViewAllCars }) {
  const { navigateTo } = useSiteNavigation()

  return (
    <section id="cars" className="cars-section">
      <div className="cars-section__inner">
        <div className="cars-grid">
          {gridCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onRent={(selectedCar) => navigateTo(`/cars/${selectedCar.id}`)}
            />
          ))}
          <CarCTACard onAllCars={onViewAllCars} onMoreCars={onViewAllCars} />
        </div>
      </div>
    </section>
  )
}
