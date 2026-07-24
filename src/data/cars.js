export const TOTAL_CARS = 32

const CAR_FILES = {
  black: 'Rectangle 12.png',
  red: 'Group 21.png',
  green: 'Rectangle 12 (1).png',
  muscle: 'Rectangle 13.png',
  wagon: 'Rectangle 12 (2).png',
  cta: '7016c2ede1e3fc3b358792263629dc44 1.png',
}

const CAR_IMAGE_CYCLE = [
  CAR_FILES.black,
  CAR_FILES.red,
  CAR_FILES.green,
  CAR_FILES.muscle,
  CAR_FILES.wagon,
]

function carPath(filename) {
  return `/cars/${encodeURIComponent(filename)}`
}

export const carImages = {
  black: carPath(CAR_FILES.black),
  red: carPath(CAR_FILES.red),
  green: carPath(CAR_FILES.green),
  muscle: carPath(CAR_FILES.muscle),
  wagon: carPath(CAR_FILES.wagon),
  cta: carPath(CAR_FILES.cta),
}

export function formatPrice(price) {
  const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `$${formatted}`
}

function buildCar(id) {
  const imageIndex = (id - 1) % CAR_IMAGE_CYCLE.length
  const isLeftColumn = (id - 1) % 2 === 0

  return {
    id,
    name: '1967 Toyota 2000GT',
    price: isLeftColumn ? 39000 : 66700,
    miles: '14, 900 miles',
    image: carPath(CAR_IMAGE_CYCLE[imageIndex]),
  }
}

export const gridCars = Array.from({ length: 5 }, (_, index) => buildCar(index + 1))

export const allCars = Array.from({ length: TOTAL_CARS }, (_, index) => buildCar(index + 1))
