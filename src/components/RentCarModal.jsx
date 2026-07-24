import Modal from './Modal'
import ApplicationForm from './ApplicationForm'
import { formatPrice } from '../data/cars'

export default function RentCarModal({ car, onClose }) {
  return (
    <Modal isOpen={!!car} onClose={onClose} title={`Rent ${car?.name ?? ''}`}>
      {car && (
        <>
          <p className="modal-car-price">
            {formatPrice(car.price)}
            <span> / day</span>
          </p>
          <ApplicationForm
            onSuccess={() => {
              setTimeout(onClose, 2000)
            }}
          />
        </>
      )}
    </Modal>
  )
}
