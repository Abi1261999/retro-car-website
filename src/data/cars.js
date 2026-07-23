import carBlack from '../assets/cars/car-black.jpg'
import carRed from '../assets/cars/car-red.jpg'
import carGreen from '../assets/cars/car-green.jpg'
import carMuscle from '../assets/cars/car-muscle.jpg'
import carWagon from '../assets/cars/car-wagon.jpg'
import carCta from '../assets/cars/car-cta.jpg'

export const carImages = {
  black: carBlack,
  red: carRed,
  green: carGreen,
  muscle: carMuscle,
  wagon: carWagon,
  cta: carCta,
}

export const gridCars = [
  {
    id: 1,
    name: '1967 Toyota 2000GT',
    price: 39000,
    miles: '14, 900 miles',
    image: carBlack,
  },
  {
    id: 2,
    name: '1967 Toyota 2000GT',
    price: 66700,
    miles: '14, 900 miles',
    image: carRed,
  },
  {
    id: 3,
    name: '1967 Toyota 2000GT',
    price: 39000,
    miles: '14, 900 miles',
    image: carGreen,
  },
  {
    id: 4,
    name: '1967 Toyota 2000GT',
    price: 66700,
    miles: '14, 900 miles',
    image: carMuscle,
  },
  {
    id: 5,
    name: '1967 Toyota 2000GT',
    price: 39000,
    miles: '14, 900 miles',
    image: carWagon,
  },
]

export function formatPrice(price) {
  const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `$${formatted}`
}
