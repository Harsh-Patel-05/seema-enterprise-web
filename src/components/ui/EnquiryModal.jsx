import { useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import Modal from './Modal'
import Button from './Button'
import { SITE } from '../../data/products'
import { useApp } from '../../context/AppContext'

const initial = { name: '', phone: '', email: '', requirement: '', message: '' }

export default function EnquiryModal() {
  const { enquiryOpen, enquiryProduct, closeEnquiry, pushToast } = useApp()
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const onClose = () => {
    closeEnquiry()
    setTimeout(() => {
      setForm(initial)
      setErrors({})
      setSuccess(false)
    }, 200)
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.phone.trim()) next.phone = 'Phone is required'
    else if (!/^[0-9+\-\s]{8,15}$/.test(form.phone.trim())) next.phone = 'Enter a valid phone'
    if (!form.requirement.trim() && !enquiryProduct) next.requirement = 'Please describe your requirement'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSuccess(true)
    pushToast('Enquiry sent successfully')
  }

  const fieldClass = (key) =>
    `h-11 w-full border px-3 text-sm outline-none transition focus:border-brand-red ${
      errors[key] ? 'border-brand-red' : 'border-brand-soft'
    }`

  return (
    <Modal
      open={enquiryOpen}
      onClose={onClose}
      title={success ? 'Enquiry Received' : 'Send Enquiry'}
    >
      {success ? (
        <div className="py-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-brand-red/10 text-brand-red">
            ✓
          </div>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted">
            Thank you. Our team will contact you shortly regarding{' '}
            <span className="font-semibold text-brand-black">
              {enquiryProduct?.name || form.requirement || 'your requirement'}
            </span>
            .
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button as="a" href={SITE.phoneHref} size="sm" variant="dark">
              <Phone size={14} /> Call Us
            </Button>
            <Button as="a" href={SITE.whatsappHref} target="_blank" rel="noreferrer" size="sm" variant="whatsapp">
              <MessageCircle size={14} /> WhatsApp
            </Button>
            <Button size="sm" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3" noValidate>
          {enquiryProduct && (
            <div className="border border-brand-soft bg-brand-grey p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Product</p>
              <p className="mt-1 font-semibold text-brand-black">{enquiryProduct.name}</p>
              <p className="text-sm text-brand-muted">
                {enquiryProduct.brand} · {enquiryProduct.category}
              </p>
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-semibold">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={fieldClass('name')}
              placeholder="Your full name"
            />
            {errors.name && <p className="mt-1 text-xs text-brand-red">{errors.name}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Phone Number</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={fieldClass('phone')}
              placeholder="+91 XXXXX XXXXX"
            />
            {errors.phone && <p className="mt-1 text-xs text-brand-red">{errors.phone}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Email (optional)</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="h-11 w-full border border-brand-soft px-3 text-sm outline-none focus:border-brand-red"
              placeholder="you@email.com"
            />
          </div>
          {!enquiryProduct && (
            <div>
              <label className="mb-1 block text-sm font-semibold">Product / Requirement</label>
              <input
                value={form.requirement}
                onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                className={fieldClass('requirement')}
                placeholder="e.g. Polycab 2.5 sqmm wire"
              />
              {errors.requirement && (
                <p className="mt-1 text-xs text-brand-red">{errors.requirement}</p>
              )}
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-semibold">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="min-h-24 w-full border border-brand-soft px-3 py-2 text-sm outline-none focus:border-brand-red"
              placeholder="Quantity, brand preference, project details..."
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            Send Enquiry
          </Button>
        </form>
      )}
    </Modal>
  )
}
