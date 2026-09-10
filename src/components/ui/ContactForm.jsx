import { useState } from 'react'
import Button from './Button'
import { useApp } from '../../context/AppContext'

const initial = {
  name: '',
  phone: '',
  email: '',
  requirement: '',
  message: '',
}

export default function ContactForm({ title = 'Send Enquiry', compact = false }) {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const { pushToast } = useApp()

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.phone.trim()) next.phone = 'Phone is required'
    else if (!/^[0-9+\-\s]{8,15}$/.test(form.phone.trim())) next.phone = 'Enter a valid phone'
    if (!form.requirement.trim()) next.requirement = 'Requirement is required'
    if (!form.message.trim()) next.message = 'Message is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSuccess(true)
    setForm(initial)
    pushToast('Enquiry submitted successfully')
  }

  const inputClass = (key) =>
    `${compact ? 'h-11' : 'h-12'} w-full border bg-white px-3 text-sm outline-none transition focus:border-brand-red ${
      errors[key] ? 'border-brand-red' : 'border-brand-soft'
    }`

  if (success) {
    return (
      <div className="border border-brand-soft bg-brand-grey p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center bg-brand-red text-white">✓</div>
        <h3 className="mt-4 font-display text-xl font-bold text-brand-black">Enquiry Received</h3>
        <p className="mt-2 text-sm text-brand-muted">
          Thank you. Our team will get back to you during business hours.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => setSuccess(false)}>
          Send Another Enquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {!compact && (
        <div>
          <h3 className="font-display text-xl font-bold text-brand-black">{title}</h3>
          <p className="mt-1 text-sm text-brand-muted">We typically respond within business hours.</p>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass('name')}
            placeholder="Your full name"
          />
          {errors.name && <p className="mt-1 text-xs text-brand-red">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold">Phone Number</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass('phone')}
            placeholder="+91 XXXXX XXXXX"
          />
          {errors.phone && <p className="mt-1 text-xs text-brand-red">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass('email')}
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold">Product / Requirement</label>
        <input
          value={form.requirement}
          onChange={(e) => setForm({ ...form, requirement: e.target.value })}
          className={inputClass('requirement')}
          placeholder="What are you looking for?"
        />
        {errors.requirement && <p className="mt-1 text-xs text-brand-red">{errors.requirement}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold">Message</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`min-h-28 w-full border bg-white px-3 py-2 text-sm outline-none focus:border-brand-red ${
            errors.message ? 'border-brand-red' : 'border-brand-soft'
          }`}
          placeholder="Quantity, brand preference, project details..."
        />
        {errors.message && <p className="mt-1 text-xs text-brand-red">{errors.message}</p>}
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Send Enquiry
      </Button>
    </form>
  )
}
