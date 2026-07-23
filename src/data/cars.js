export const featuredCars = [
  {
    id: 1,
    name: '1967 Toyota 2000GT',
    price: 39000,
    miles: '14, 900 miles',
    image: '/images/car-black.jpg',
  },
  {
    id: 2,
    name: '1967 Toyota 2000GT',
    price: 66700,
    miles: '14, 900 miles',
    image: '/images/car-red.jpg',
  },
]

export const cars = [
  {
    id: 3,
    name: '1967 Toyota 2000GT',
    price: 39000,
    miles: '14, 900 miles',
    image: '/images/car-black.jpg',
  },
  {
    id: 4,
    name: '1967 Toyota 2000GT',
    price: 66700,
    miles: '14, 900 miles',
    image: '/images/car-red.jpg',
  },
  {
    id: 5,
    name: '1967 Toyota 2000GT',
    price: 39000,
    miles: '14, 900 miles',
    image: '/images/car-black.jpg',
  },
  {
    id: 6,
    name: '1967 Toyota 2000GT',
    price: 66700,
    miles: '14, 900 miles',
    image: '/images/car-red.jpg',
  },
]

export const extraCars = Array.from({ length: 29 }, (_, i) => ({
  id: 100 + i,
  name: '1967 Toyota 2000GT',
  price: i % 2 === 0 ? 39000 : 66700,
  miles: '14, 900 miles',
  image: i % 2 === 0 ? '/images/car-black.jpg' : '/images/car-red.jpg',
}))

export function formatPrice(price) {
  const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `$${formatted}`
}
