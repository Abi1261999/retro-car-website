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

export const carDetailSpecs = [
  { label: 'Make', value: 'Chevrolet' },
  { label: 'Model', value: 'Chevelle SS' },
  { label: 'Transmission', value: '4-speed manual' },
  { label: 'VIN', value: '138176A142692' },
  { label: 'Body Color', value: 'Red' },
  { label: 'Mileage', value: '28,432 miles' },
  { label: 'Engine Size', value: '427ci' },
  { label: 'Year', value: '1966' },
  { label: 'Type', value: 'Hardtop' },
  { label: 'Interior Color', value: 'Red' },
]

export const carDetailAbout = {
  title: '1966 Chevrolet Chevelle SS – STK 2801',
  paragraphs: [
    'The 1966 Chevelle SS396 captivated onlookers with its striking appearance. The revamped Fisher body ushered in a new era for the mid-size Chevy, establishing it as a performance icon. In this iteration, the SS396 evolved into a distinct model within the Chevelle lineup, showcasing numerous styling upgrades and an unwavering focus on performance.',
    'This "138" code Chevelle SS396 underwent an impressive frame-off restoration in 2013, emerging as a visual masterpiece. A professional application of Bolero Red paint revitalized the exterior, complemented by a meticulous restoration of the interior in original red vinyl. Every authentic detail, including the Muncie "hypodermic" shifter, was thoughtfully recreated. The cabin features a complete set of SunPro gauges alongside a column-mounted tachometer, tinted windows, and an aftermarket AM/FM/cassette stereo system.',
    'Under the hood, the original 396ci "Rat" powerplant gave way to a robust 427ci big-block. This powerhouse, meticulously rebuilt, boasts an aluminum intake, dual-line Holley carburetor, and a street-savvy cam. Paired with a 4-speed manual transmission, the throaty exhaust note resonates with power. (Trivia: A few years later, Don Yenko Chevrolet in Pittsburgh adopted a similar drivetrain package for their COPO Chevelles.)',
    'GM Rally wheels with trim rings and centers embrace sturdy 15" BFG Radial T/A tires. Steering is managed manually, while power disc/drum brakes, a front sway bar, and HD shocks contribute to a balanced driving experience.',
  ],
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
    imageIndex,
  }
}

export function getCarGallery(car) {
  const images = []
  for (let offset = 0; offset < 4; offset += 1) {
    const index = (car.imageIndex + offset) % CAR_IMAGE_CYCLE.length
    images.push(carPath(CAR_IMAGE_CYCLE[index]))
  }
  return images
}

export function getCarById(id) {
  const numericId = Number(id)
  if (!Number.isInteger(numericId) || numericId < 1 || numericId > TOTAL_CARS) {
    return null
  }
  return buildCar(numericId)
}

export const gridCars = Array.from({ length: 5 }, (_, index) => buildCar(index + 1))

export const allCars = Array.from({ length: TOTAL_CARS }, (_, index) => buildCar(index + 1))
