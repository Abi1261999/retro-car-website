import { useState } from 'react'
import Navbar from '../components/Navbar'
import CarCard from '../components/CarCard'
import Footer from '../components/Footer'
import RentCarModal from '../components/RentCarModal'
import { allCars, TOTAL_CARS } from '../data/cars'
import { useSiteNavigation } from '../hooks/useSiteNavigation'

export default function CarsPage() {
  const [rentCar, setRentCar] = useState(null)
  const { navigateTo } = useSiteNavigation()

  return (
    <>
      <Navbar onNavClick={navigateTo} />
      <main className="cars-page">
        <div className="cars-page__inner">
          <header className="cars-page__header">
            <h1 className="cars-page__title">Our cars</h1>
            <p className="cars-page__count">{TOTAL_CARS} cars</p>
          </header>

          <div className="cars-grid cars-grid--page">
            {allCars.map((car) => (
              <CarCard key={car.id} car={car} onRent={setRentCar} />
            ))}
          </div>
        </div>
      </main>
      <Footer onNavClick={navigateTo} />

      <RentCarModal car={rentCar} onClose={() => setRentCar(null)} />
    </>
  )
}
