const CAR_FILES = {
  black: 'Rectangle 12.png',
  red: 'Group 21.png',
  green: 'Rectangle 12 (1).png',
  muscle: 'Rectangle 13.png',
  wagon: 'Rectangle 12 (2).png',
}

function carPath(filename) {
  return `/cars/${encodeURIComponent(filename)}`
}

export const carImages = {
  black: carPath(CAR_FILES.black),
  red: carPath(CAR_FILES.red),
  green: carPath(CAR_FILES.green),
  muscle: carPath(CAR_FILES.muscle),
  wagon: carPath(CAR_FILES.wagon),
}

export const gridCars = [
  {
    id: 1,
    name: '1967 Toyota 2000GT',
    price: 39000,
    miles: '14, 900 miles',
    image: carImages.black,
  },
  {
    id: 2,
    name: '1967 Toyota 2000GT',
    price: 66700,
    miles: '14, 900 miles',
    image: carImages.red,
  },
  {
    id: 3,
    name: '1967 Toyota 2000GT',
    price: 39000,
    miles: '14, 900 miles',
    image: carImages.green,
  },
  {
    id: 4,
    name: '1967 Toyota 2000GT',
    price: 66700,
    miles: '14, 900 miles',
    image: carImages.muscle,
  },
  {
    id: 5,
    name: '1967 Toyota 2000GT',
    price: 39000,
    miles: '14, 900 miles',
    image: carImages.wagon,
  },
]

export function formatPrice(price) {
  const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `$${formatted}`
}
