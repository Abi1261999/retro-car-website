const imageModules = import.meta.glob('../assets/cars/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
})

function getCarImage(filename) {
  const entry = Object.entries(imageModules).find(([path]) =>
    path.toLowerCase().endsWith(`/${filename.toLowerCase()}`),
  )
  return entry ? entry[1] : ''
}

export const carImages = {
  black: getCarImage('car-black.jpg'),
  red: getCarImage('car-red.jpg'),
  green: getCarImage('car-green.jpg'),
  muscle: getCarImage('car-muscle.jpg'),
  wagon: getCarImage('car-wagon.jpg'),
  cta: getCarImage('car-cta.jpg'),
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
