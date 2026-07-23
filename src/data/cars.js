export const cars = [
  {
    id: 1,
    name: '1967 Toyota 2000GT',
    price: 39000,
    miles: '14,900 miles',
    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
    featured: true,
  },
  {
    id: 2,
    name: '1967 Toyota 2000GT',
    price: 66700,
    miles: '14,900 miles',
    image:
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop',
    featured: false,
  },
  {
    id: 3,
    name: '1967 Toyota 2000GT',
    price: 39000,
    miles: '14,900 miles',
    image:
      'https://images.unsplash.com/photo-1583121274602-3e2820c50d8d?w=600&h=400&fit=crop',
    featured: true,
  },
  {
    id: 4,
    name: '1967 Toyota 2000GT',
    price: 66700,
    miles: '14,900 miles',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop',
    featured: false,
  },
  {
    id: 5,
    name: '1965 Ford Mustang',
    price: 52000,
    miles: '22,300 miles',
    image:
      'https://images.unsplash.com/photo-1584345609902-2a5b7c0b9d5f?w=600&h=400&fit=crop',
    featured: false,
  },
  {
    id: 6,
    name: '1969 Chevrolet Camaro',
    price: 48500,
    miles: '18,700 miles',
    image:
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&h=400&fit=crop',
    featured: false,
  },
]

export const extraCars = Array.from({ length: 29 }, (_, i) => ({
  id: 100 + i,
  name: `Classic Car ${i + 7}`,
  price: 35000 + i * 1200,
  miles: `${10000 + i * 500} miles`,
  image: `https://images.unsplash.com/photo-${1552519507 + (i % 5)}-da3b142c6e3d?w=600&h=400&fit=crop`,
}))
