const carBlack = new URL('../assets/cars/Rectangle 12.png', import.meta.url).href
const carRed = new URL('../assets/cars/Group 21.png', import.meta.url).href
const carGreen = new URL('../assets/cars/Rectangle 12 (1).png', import.meta.url).href
const carMuscle = new URL('../assets/cars/Rectangle 13.png', import.meta.url).href
const carWagon = new URL('../assets/cars/Rectangle 12 (2).png', import.meta.url).href
const carCta = new URL('../assets/cars/7016c2ede1e3fc3b358792263629dc44 1.png', import.meta.url).href

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
