export const services = [
  {
    id: 'shipping',
    num: '01',
    title: 'SHIPPING',
    image: '/services/service-shipping.png',
    cta: 'Deliver the car',
    paragraphs: [
      'We partner with trusted shipping professionals experienced in handling classic automobiles. From meticulous loading to secure transit, we prioritize the safety of your vehicle throughout its journey to your doorstep. Our global shipping network allows us to cater to enthusiasts worldwide, bringing the allure of classic cars to every corner of the globe.',
      'Rest easy knowing that your classic car is in the hands of experts who share your passion for preserving automotive history. Whether it’s a local delivery or an international shipment, ALL CLASSIC MOTORS VELVA is committed to ensuring that your timeless vehicle arrives with the same elegance and care it had in our showroom.',
      'Experience worry-free shipping with ALL CLASSIC MOTORS VELVA and let us bring the joy of classic cars directly to you. Your journey with your classic car starts from the moment it leaves our hands to the moment it arrives at yours.',
    ],
  },
  {
    id: 'warranty',
    num: '02',
    title: 'WARRANTY PURCHASE',
    image: '/services/service-warranty.png',
    cta: 'I want to put',
    paragraphs: [
      'Our comprehensive warranty options provide an added layer of protection, ensuring that you can fully enjoy the beauty of your timeless vehicle without worry. Choose from our range of warranty packages tailored to meet the unique needs of classic car enthusiasts. Our warranties cover essential components, providing you with confidence and assurance in the reliability of your cherished automobile.',
      'With ALL CLASSIC MOTORS VELVA’s warranty options, you’re not just investing in protection; you’re investing in the longevity and continued performance of your classic car. Our commitment to your satisfaction extends beyond the showroom, offering a safety net that aligns with the timeless quality of the vehicles in our collection.',
    ],
  },
  {
    id: 'financing',
    num: '03',
    title: 'FINANCING',
    image: '/services/service-financing.png',
    cta: 'Deliver the car',
    paragraphs: [
      'Our financing options are designed to accommodate various budgets and preferences. Whether you are a seasoned collector or a first-time buyer, our team is dedicated to finding a financing plan that suits your needs. Benefit from competitive interest rates and straightforward terms that align with the timeless value of the classic car you desire.',
      'Applying for financing with us is a hassle-free process. Our knowledgeable team is ready to guide you through the application, ensuring that you have a clear understanding of the terms and conditions. We believe in transparency, and our commitment is to provide you with a financing solution that enhances your enjoyment of the classic car of your dreams.',
      'Take the next step in your journey to classic car ownership by exploring our financing options. ALL CLASSIC MOTORS VELVA is here to make your dream car a reality, with financing plans that reflect our dedication to your satisfaction and the preservation of automotive history.',
    ],
  },
]

export function getServiceById(id) {
  return services.find((service) => service.id === id) ?? null
}
